document.addEventListener("DOMContentLoaded", () => {
    console.log("Страница загружена, скрипт выполняется.");
    
    const game = new Game();
    const pvpGame = new PvPGame();

    // Назначаем обработчики событий
    document.getElementById("click-btn").addEventListener("click", () => game.earnMoney());
    document.getElementById("upgrade-click").addEventListener("click", () => game.upgradeClick());
    document.getElementById("reset-balance").addEventListener("click", () => game.resetBalance());
    document.getElementById("start-battle").addEventListener("click", () => pvpGame.startBattle());
    document.getElementById("attack-btn").addEventListener("click", () => pvpGame.playerAttackAction());
    document.getElementById("bite-btn").addEventListener("click", () => pvpGame.biteAction());
    document.getElementById("claw-btn").addEventListener("click", () => pvpGame.clawAction());
    document.getElementById("surrender-btn").addEventListener("click", () => pvpGame.surrender());
});

// Класс игры (кликер)
class Game {
    constructor() {
        this.money = 0;
        this.clickPower = 1;
        this.clickUpgradeCost = 20;
        this.fightWins = 0;
        this.updateUI();
    }

    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;
        document.getElementById("click-upgrade-cost").innerText = this.clickUpgradeCost;
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
    }

    upgradeClick() {
        if (this.money >= this.clickUpgradeCost) {
            this.money -= this.clickUpgradeCost;
            this.clickPower *= 2;
            this.clickUpgradeCost *= 2;
            this.updateUI();
        } else {
            alert("Недостаточно монет!");
        }
    }

    resetBalance() {
        this.money = 0;
        this.clickPower = 1;
        this.clickUpgradeCost = 20;
        this.fightWins = 0;
        this.updateUI();
        alert("Баланс обнулён!");
    }
}

// Класс боя с ботом
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
        this.checkGameOver();
        setTimeout(() => this.botTurn(), 3000);
    }

    botTurn() {
        if (!this.canAct) return;
        this.setActionDelay();

        this.playerHP -= this.botAttack;
        alert(`Бот атаковал на ${this.botAttack} урона!`);
        this.checkGameOver();
    }

    surrender() {
        alert("Хомяки не сдаются!");
    }

    checkGameOver() {
        if (this.botHP <= 0) {
            alert("Ты победил!");
            if (game.fightWins < 10) {
                game.clickPower *= 2; // Увеличиваем только клик
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
    }

    setActionDelay() {
        this.canAct = false;
        setTimeout(() => (this.canAct = true), 3000);
    }
}
