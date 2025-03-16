class PvPGame {
    constructor() {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerAttack = 10;
        this.botAttack = 8;
        this.botBlockChance = 0.3;
        this.criticalHitChance = 0.1;
        this.canAct = true;
    }

    startBattle() {
        document.getElementById("start-battle").style.display = "none";
        document.getElementById("battle-container").style.display = "block";
        this.updateUI();
    }

    playerAttackAction() {
        if (!this.canAct) return;
        this.setActionDelay();

        let damage = this.playerAttack * (Math.random() < this.criticalHitChance ? 2 : 1);
        if (Math.random() < this.botBlockChance) {
            alert("Бот заблокировал удар!");
        } else {
            this.botHP -= damage;
            alert(`Ты ударил бота на ${damage} урона!`);
        }

        this.updateUI();
        if (this.botHP <= 0) {
            this.checkGameOver();
        } else {
            setTimeout(() => this.botTurn(), 3000);
        }
    }

    botTurn() {
        if (!this.canAct || this.botHP <= 0) return;
        this.setActionDelay();

        this.playerHP -= this.botAttack;
        alert(`Бот атаковал тебя на ${this.botAttack} урона!`);

        this.updateUI();
        this.checkGameOver();
    }

    surrender(event) {
        if (event) event.preventDefault();
        alert("Хомяки не сдаются!");
    }

    checkGameOver() {
        if (this.botHP <= 0) {
            alert("Ты победил!");
            if (game.fightWins < 10) {
                game.clickPower *= 2; // Улучшение только клика
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
        this.playerAttack = 10;
        this.botBlockChance = 0.3;
        this.updateUI();
    }

    updateUI() {
        document.getElementById("player-hp").innerText = this.playerHP;
        document.getElementById("bot-hp").innerText = this.botHP;
    }

    setActionDelay() {
        this.canAct = false;
        setTimeout(() => (this.canAct = true), 3000);
    }
}
