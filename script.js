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
        this.businesses = [
            { name: "Кафе «У Хомы»", price: 100, income: 10 },
            { name: "Зоопарк Хомяков", price: 1000, income: 75 },
            { name: "Хомячья качалка", price: 5000, income: 300 },
            { name: "АЗС «Хомяк»", price: 10000, income: 500 },
            { name: "Школа «Хома Сапиенс»", price: 50000, income: 2000 },
            { name: "$hmstr", price: 75000, income: 0, warning: "Ты дурак? Не стоит это покупать!" },
            { name: "Автосалон «На хомяке»", price: 100000, income: 3500 },
            { name: "Игра «Hamster Combat»", price: 250000, income: 7500 },
        ];
        this.ownedBusinesses = [];
        this.incomePerSecond = 0;
        this.updateUI();
        this.startIncome();
    }

    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;
        document.getElementById("click-upgrade-cost").innerText = this.clickUpgradeCost;
        this.updateBusinessList();
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

    buyBusiness(index) {
        const business = this.businesses[index];
        if (this.money >= business.price && !this.ownedBusinesses.includes(business.name)) {
            this.money -= business.price;
            this.ownedBusinesses.push(business.name);
            this.incomePerSecond += business.income;
            if (business.warning) alert(business.warning);
            this.updateUI();
        } else {
            alert("Недостаточно монет или бизнес уже куплен!");
        }
    }

    updateBusinessList() {
        const list = document.getElementById("business-list");
        list.innerHTML = "";
        this.businesses.forEach((business, index) => {
            if (!this.ownedBusinesses.includes(business.name)) {
                let li = document.createElement("li");
                li.innerHTML = `${business.name} - ${business.price} монет <button onclick="game.buyBusiness(${index})">Купить</button>`;
                list.appendChild(li);
            }
        });
    }

    startIncome() {
        setInterval(() => {
            this.money += this.incomePerSecond;
            this.updateUI();
        }, 1000);
    }

    resetBalance() {
        this.money = 0;
        this.clickPower = 1;
        this.clickUpgradeCost = 20;
        this.fightWins = 0;
        this.ownedBusinesses = [];
        this.incomePerSecond = 0;
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
        document.querySelectorAll("button:not(#battle-container button)").forEach(btn => btn.style.display = "none");
    }

    playerAttackAction() {
        if (!this.canAct) return;
        this.canAct = false;

        setTimeout(() => {
            let damage = this.playerAttack * (Math.random() < this.criticalHitChance ? 2 : 1);
            if (Math.random() < this.botBlockChance) alert("Бот заблокировал удар!");
            else this.botHP -= damage;

            this.updateUI();
            this.checkGameOver();
            setTimeout(() => this.botTurn(), 3000);
        }, 3000);
    }

    botTurn() {
        this.playerHP -= this.botAttack;
        this.updateUI();
    }

    updateUI() {
        document.getElementById("player-hp").innerText = this.playerHP;
        document.getElementById("bot-hp").innerText = this.botHP;
    }
}
