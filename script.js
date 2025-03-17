class Game {
    constructor() {
        this.money = 0;
        this.clickPower = 1;
        this.passiveIncome = 0;
        this.fightWins = 0;
        this.businesses = [
            { name: "Кафе «У Хомы»", price: 100, income: 10, bought: false },
            { name: "Зоопарк Хомяков", price: 1000, income: 75, bought: false },
            { name: "Хомячья качалка", price: 5000, income: 300, bought: false },
            { name: "АЗС «Хомяк»", price: 10000, income: 500, bought: false },
            { name: "Школа ХОМАсапиенс", price: 50000, income: 2000, bought: false },
            { name: "$hmstr", price: 75000, income: 0, bought: false },
            { name: "Автосалон «На хомяке»", price: 100000, income: 3500, bought: false },
            { name: "Игра «Hamster combat»", price: 250000, income: 7500, bought: false }
        ];
        this.loadGame();
        this.updateUI();
        setInterval(() => this.earnPassiveIncome(), 1000);
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
        this.saveGame();
    }

    buyBusiness(index) {
        let business = this.businesses[index];
        if (this.money >= business.price && !business.bought) {
            this.money -= business.price;
            this.passiveIncome += business.income;
            business.bought = true;
            this.updateUI();
            this.saveGame();
        }
    }

    earnPassiveIncome() {
        this.money += this.passiveIncome;
        this.updateUI();
    }

    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;
        let businessList = document.getElementById("business-list");
        businessList.innerHTML = "";
        this.businesses.forEach((business, index) => {
            if (!business.bought) {
                let card = document.createElement("div");
                card.className = "business-card";
                card.innerHTML = `
                    <p>${business.name}</p>
                    <p>💰 Цена: ${business.price} монет</p>
                    <p>📈 Доход: ${business.income} в секунду</p>
                    <button onclick="game.buyBusiness(${index})">Купить</button>
                `;
                businessList.appendChild(card);
            }
        });
    }

    saveGame() {
        localStorage.setItem("hamsterGame", JSON.stringify(this));
    }

    loadGame() {
        let savedGame = JSON.parse(localStorage.getItem("hamsterGame"));
        if (savedGame) {
            this.money = savedGame.money;
            this.clickPower = savedGame.clickPower;
            this.passiveIncome = savedGame.passiveIncome;
            this.fightWins = savedGame.fightWins;
            this.businesses = savedGame.businesses;
        }
    }
}

class PvPGame {
    constructor() {
        this.playerHP = 100;
        this.botHP = 100;
    }

    startBattle() {
        document.getElementById("battle-container").style.display = "block";
    }

    playerAttackAction() {
        this.botHP -= 10;
        this.updateBattleUI();
    }

    updateBattleUI() {
        document.getElementById("player-hp").innerText = this.playerHP;
        document.getElementById("bot-hp").innerText = this.botHP;
    }
}

const game = new Game();
const pvpGame = new PvPGame();
