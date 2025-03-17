class Game {
    constructor() {
        this.balance = 0;
        this.clickPower = 1;
        this.fightWins = 0;
        this.businesses = [
            { name: "Кафе «У Хомы»", price: 100, income: 10 },
            { name: "Зоопарк Хомяков", price: 1000, income: 75 },
            { name: "Хомячья качалка", price: 5000, income: 300 },
            { name: "АЗС «Хомяк»", price: 10000, income: 500 },
            { name: "Школа «ХОМАсапиенс»", price: 50000, income: 2000 },
            { name: "$hmstr", price: 75000, income: 0 },
            { name: "Автосалон «На хомяке»", price: 100000, income: 3500 },
            { name: "Игра «Hamster Combat»", price: 250000, income: 7500 }
        ];
        this.ownedBusinesses = [];
        this.loadGame();
        this.updateUI();
    }

    click() {
        this.balance += this.clickPower;
        this.updateUI();
    }

    buyBusiness(index) {
        let business = this.businesses[index];
        if (this.balance >= business.price) {
            this.balance -= business.price;
            this.ownedBusinesses.push(business);
            this.updateUI();
        } else {
            alert("Не хватает монет!");
        }
    }

    updateUI() {
        document.getElementById("balance").textContent = this.balance;
        let businessList = document.getElementById("business-list");
        businessList.innerHTML = "";
        this.ownedBusinesses.forEach(biz => {
            let div = document.createElement("div");
            div.className = "business-card";
            div.innerHTML = `<strong>${biz.name}</strong><br>Доход: ${biz.income}/сек`;
            businessList.appendChild(div);
        });
        this.saveGame();
    }

    saveGame() {
        localStorage.setItem("gameData", JSON.stringify({
            balance: this.balance,
            clickPower: this.clickPower,
            fightWins: this.fightWins,
            ownedBusinesses: this.ownedBusinesses
        }));
    }

    loadGame() {
        let data = JSON.parse(localStorage.getItem("gameData"));
        if (data) {
            this.balance = data.balance;
            this.clickPower = data.clickPower;
            this.fightWins = data.fightWins;
            this.ownedBusinesses = data.ownedBusinesses;
        }
    }
}

class PvPGame {
    constructor(game) {
        this.game = game;
        this.playerHP = 100;
        this.botHP = 100;
        this.botBlockChance = 0.3;
        this.playerBlockChance = 0.2;
        this.criticalHitChance = 0.1;
        this.canAct = true;
    }

    startBattle() {
        document.getElementById("start-battle").style.display = "none";
        document.getElementById("business-container").style.display = "none";
        document.getElementById("click-btn").style.display = "none";
        document.getElementById("game-title").style.display = "none";
        document.getElementById("balance-display").style.display = "none";

        document.getElementById("battle-container").style.display = "block";
        this.updateBattleUI();
    }

    playerAttack() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = Math.random() < this.criticalHitChance ? 20 : 10;
        if (Math.random() < this.botBlockChance) {
            alert("Бот блокировал удар! 🛡");
        } else {
            this.botHP -= damage;
            alert(`Ты ударил бота на ${damage} урона!`);
        }

        this.updateBattleUI();
        setTimeout(() => this.botTurn(), 1500);
    }

    botTurn() {
        let damage = 8;
        if (Math.random() < this.playerBlockChance) {
            alert("Ты блокировал удар! 🛡");
        } else {
            this.playerHP -= damage;
            alert(`Бот атаковал на ${damage} урона!`);
        }

        this.updateBattleUI();
        this.canAct = true;
    }

    updateBattleUI() {
        document.getElementById("player-hp").textContent = this.playerHP;
        document.getElementById("bot-hp").textContent = this.botHP;

        if (this.botHP <= 0) {
            alert("Ты победил! Доход за клик увеличен в 2 раза!");
            this.game.clickPower *= 2;
            this.endBattle();
        } else if (this.playerHP <= 0) {
            alert("Ты проиграл!");
            this.endBattle();
        }
    }

    endBattle() {
        document.getElementById("battle-container").style.display = "none";
        document.getElementById("start-battle").style.display = "block";
        document.getElementById("business-container").style.display = "block";
        document.getElementById("click-btn").style.display = "block";
        document.getElementById("game-title").style.display = "block";
        document.getElementById("balance-display").style.display = "block";

        this.game.updateUI();
    }
}

const game = new Game();
const battle = new PvPGame(game);

document.getElementById("click-btn").addEventListener("click", () => game.click());
document.getElementById("start-battle").addEventListener("click", () => battle.startBattle());
document.getElementById("attack-btn").addEventListener("click", () => battle.playerAttack());
