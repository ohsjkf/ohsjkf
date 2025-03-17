class Game {
    constructor() {
        this.money = 0;
        this.clickPower = 1;
        this.fightWins = 0;
        this.updateUI();
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
    }

    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;
    }
}

class PvPGame {
    constructor() {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerAttack = 10;
        this.botAttack = 8;
        this.playerBlockChance = 0.2;
        this.botBlockChance = 0.3;
        this.criticalHitChance = 0.1;
        this.canAct = true;
    }

    startBattle() {
        document.getElementById("game-title").style.display = "none";
        document.getElementById("balance-display").style.display = "none";
        document.getElementById("click-button").style.display = "none";
        document.getElementById("businesses-title").style.display = "none";
        document.getElementById("business-list").style.display = "none";
        document.getElementById("battle-title").style.display = "none";
        document.getElementById("start-battle").style.display = "none";

        document.getElementById("battle-container").style.display = "block";
        this.updateBattleUI();
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
        this.checkGameOver();
        setTimeout(() => this.botTurn(), 1500);
    }

    clawAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = 7;
        if (Math.random() < this.botBlockChance) {
            alert("Бот заблокировал когти!");
        } else {
            this.botHP -= damage;
            alert(`Ты вытащил когти и нанёс ${damage} урона!`);
        }
        this.checkGameOver();
        setTimeout(() => this.botTurn(), 1500);
    }

    biteAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = 5;
        this.botHP -= damage;
        alert(`Ты укусил бота и нанёс ${damage} урона!`);
        this.checkGameOver();
        setTimeout(() => this.botTurn(), 1500);
    }

    botTurn() {
        if (this.botHP <= 0) return;
        
        let damage = this.botAttack;
        if (Math.random() < this.playerBlockChance) {
            alert("Ты заблокировал удар бота!");
        } else {
            this.playerHP -= damage;
            alert(`Бот атаковал на ${damage} урона!`);
        }
        this.checkGameOver();
        this.canAct = true;
    }

    surrender() {
        alert("Ты сдался! Бой окончен.");
        this.resetGame();
    }

    checkGameOver() {
        if (this.botHP <= 0) {
            alert("Ты победил!");
            game.clickPower *= 2;
            game.fightWins++;
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
        this.canAct = true;

        document.getElementById("game-title").style.display = "block";
        document.getElementById("balance-display").style.display = "block";
        document.getElementById("click-button").style.display = "block";
        document.getElementById("businesses-title").style.display = "block";
        document.getElementById("business-list").style.display = "block";
        document.getElementById("battle-title").style.display = "block";
        document.getElementById("start-battle").style.display = "block";
        document.getElementById("battle-container").style.display = "none";
    }

    updateBattleUI() {
        document.getElementById("player-hp").innerText = this.playerHP;
        document.getElementById("bot-hp").innerText = this.botHP;
    }
}

const game = new Game();
const pvpGame = new PvPGame();
