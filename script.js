document.addEventListener("DOMContentLoaded", () => {
    window.game = new Game();
    window.pvpGame = new PvPGame();

    document.getElementById("click-btn").addEventListener("click", () => game.earnMoney());
    document.getElementById("start-battle").addEventListener("click", () => pvpGame.startBattle());
    document.getElementById("attack-btn").addEventListener("click", () => pvpGame.playerAttackAction());
    document.getElementById("bite-btn").addEventListener("click", () => pvpGame.biteAction());
    document.getElementById("claw-btn").addEventListener("click", () => pvpGame.clawAction());
    document.getElementById("surrender-btn").addEventListener("click", () => pvpGame.surrender());
});

class PvPGame {
    constructor() {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerAttack = 10;
        this.botAttack = 8;
        this.botBlockChance = 0.3;
        this.playerBlockChance = 0.3; // Шанс блока для игрока
        this.criticalHitChance = 0.1;
        this.fallChance = 0.2; // Шанс упасть
        this.canAct = true;
    }

    startBattle() {
        document.getElementById("start-battle").style.display = "none";
        document.getElementById("battle-container").style.display = "block";
        document.querySelectorAll("body > *:not(#battle-container)").forEach(el => el.style.display = "none");
    }

    playerAttackAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = this.playerAttack * (Math.random() < this.criticalHitChance ? 2 : 1);
        if (Math.random() < this.botBlockChance) {
            alert("Бот заблокировал удар!");
        } else {
            this.botHP -= damage;
            alert(`Ты ударил бота на ${damage} урона!`);
        }
        this.updateUI();
        setTimeout(() => this.botTurn(), 1000);
    }

    biteAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = this.playerAttack - 2;
        if (Math.random() < this.botBlockChance) {
            alert("Бот заблокировал укус!");
        } else {
            this.botHP -= damage;
            alert(`Ты укусил бота на ${damage} урона!`);
        }
        this.updateUI();
        setTimeout(() => this.botTurn(), 1000);
    }

    clawAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = this.playerAttack + 5;
        if (Math.random() < this.botBlockChance) {
            alert("Бот заблокировал удар когтями!");
        } else {
            this.botHP -= damage;
            alert(`Ты атаковал когтями на ${damage} урона!`);
        }
        this.updateUI();
        setTimeout(() => this.botTurn(), 1000);
    }

    botTurn() {
        if (Math.random() < this.playerBlockChance) {
            alert("Ты заблокировал удар бота!");
        } else {
            this.playerHP -= this.botAttack;
            alert(`Бот атаковал на ${this.botAttack} урона!`);
            
            if (Math.random() < this.fallChance) {
                alert("Ты упал и пропускаешь ход!");
                setTimeout(() => this.botTurn(), 1000);
                return;
            }
        }
        this.updateUI();
        this.checkGameOver();
        this.canAct = true;
    }

    surrender() {
        alert("Хомяки не сдаются!");
    }

    checkGameOver() {
        if (this.botHP <= 0) {
            alert("Ты победил!");
            if (game.fightWins < 10) {
                game.clickPower *= 2;
                game.fightWins++;
            }
            game.updateUI();
            this.resetGame();
        } else if (this.playerHP <= 0) {
            alert("Ты проиграл!");
            this.resetGame();
        }
    }

    resetGame() {
        this.playerHP = 100;
        this.botHP = 100;
        document.getElementById("battle-container").style.display = "none";
        document.querySelectorAll("body > *").forEach(el => el.style.display = "block");
    }

    updateUI() {
        document.getElementById("player-hp").innerText = this.playerHP;
        document.getElementById("bot-hp").innerText = this.botHP;
    }
}
