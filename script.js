// Кликер
class Game {
    constructor() {
        this.money = parseInt(localStorage.getItem("money")) || 0;
        this.clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
        this.clickUpgradeCost = parseInt(localStorage.getItem("clickUpgradeCost")) || 20;
        this.updateUI();
    }

    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;
        document.getElementById("click-upgrade-cost").innerText = this.clickUpgradeCost;
        localStorage.setItem("money", this.money);
        localStorage.setItem("clickPower", this.clickPower);
        localStorage.setItem("clickUpgradeCost", this.clickUpgradeCost);
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();

        if (this.money >= 1000000) {
            alert("Ты теперь хомяк-миллионер, но из-за постоянных нажатий тебе стало плохо...");
            alert("Игра окончена! Начни заново.");
            this.resetBalance();
        }
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
        this.updateUI();
        alert("Баланс обнулён!");
    }
}

// Бой против бота
class PvPGame {
    constructor() {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerAttack = 10;
        this.botAttack = 8;
        this.botBlockChance = 0.3;
        this.criticalHitChance = 0.1;
        this.fallChance = 0.1;
        this.updateUI();
    }

    updateUI() {
        document.getElementById("player-hp").innerText = this.playerHP;
        document.getElementById("bot-hp").innerText = this.botHP;
    }

    checkFall() {
        if (Math.random() < this.fallChance) {
            alert("😵 Хомяк упал! Ты пропускаешь ход...");
            return true;
        }
        return false;
    }

    playerAttackAction() {
        if (this.checkFall()) return;

        let damage = this.playerAttack;
        let isCritical = Math.random() < this.criticalHitChance;

        if (isCritical) {
            damage *= 2;
            alert("⚡ Критический удар! Урон удвоен!");
        }

        let botBlocked = Math.random() < this.botBlockChance;

        if (botBlocked) {
            alert("🤖 Бот заблокировал атаку!");
        } else {
            this.botHP -= damage;
            alert(`💥 Ты ударил бота на ${damage} урона!`);
        }

        this.checkGameOver();
        if (this.botHP > 0) this.botTurn();
    }

    botTurn() {
        setTimeout(() => {
            if (Math.random() < this.fallChance) {
                alert("🤖 Бот упал! Он пропустил ход.");
                return;
            }

            this.playerHP -= this.botAttack;
            alert(`🤖 Бот атаковал тебя на ${this.botAttack} урона!`);
            this.checkGameOver();
        }, 1000);
    }

    biteAction() {
        if (this.checkFall()) return;
        this.playerAttack += 5;
        alert("🦷 Ты щелкнул зубами! Теперь твой урон увеличен на 5!");
    }

    clawAction() {
        if (this.checkFall()) return;
        this.botBlockChance = 0.1;
        alert("🐾 Ты вытащил когти! Бот теперь хуже блокирует атаки.");
    }

    checkGameOver() {
        this.updateUI();
        if (this.playerHP <= 0) {
            alert("💀 Ты проиграл! Бот победил.");
            this.resetGame();
        } else if (this.botHP <= 0) {
            alert("🎉 Ты победил! Бот повержен.");
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
}

// Запуск игры
const game = new Game();
const pvpGame = new PvPGame();
