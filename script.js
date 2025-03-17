class Game {
    constructor() {
        this.money = parseInt(localStorage.getItem("money")) || 0;
        this.clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
        this.businesses = [
            { name: "Кафе «У Хомы»", cost: 100, profit: 10 },
            { name: "Зоопарк Хомяков", cost: 1000, profit: 75 },
            { name: "Хомячья качалка", cost: 5000, profit: 300 },
            { name: "АЗС «Хомяк»", cost: 10000, profit: 500 },
            { name: "Школа ХОМАсапиенс", cost: 50000, profit: 2000 },
            { name: "$hmstr", cost: 1, profit: 0, message: "Ты дурак? Не стоит это покупать!" },
            { name: "Автосалон «На хомяке»", cost: 100000, profit: 3500 },
            { name: "Игра «Hamster Combat»", cost: 250000, profit: 7500 }
        ];
        this.fightWins = parseInt(localStorage.getItem("fightWins")) || 0;
        this.businessesOwned = JSON.parse(localStorage.getItem("businessesOwned")) || [];
        this.updateUI();
        setInterval(() => this.generateIncome(), 1000);
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
    }

    buyBusiness(index) {
        let business = this.businesses[index];
        if (this.money >= business.cost && !this.businessesOwned.includes(index)) {
            this.money -= business.cost;
            this.businessesOwned.push(index);
            if (business.message) alert(business.message);
            this.updateUI();
        }
    }

    generateIncome() {
        this.businessesOwned.forEach(index => {
            this.money += this.businesses[index].profit;
        });
        this.updateUI();
    }

    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;

        let businessList = document.getElementById("business-list");
        businessList.innerHTML = "";
        this.businesses.forEach((business, index) => {
            if (!this.businessesOwned.includes(index)) {
                let div = document.createElement("div");
                div.className = "business-card";
                div.innerHTML = `
                    <h3>${business.name}</h3>
                    <p>Цена: ${business.cost} монет</p>
                    <p>Доход: ${business.profit} в секунду</p>
                    <button onclick="game.buyBusiness(${index})">Купить</button>
                `;
                businessList.appendChild(div);
            }
        });

        localStorage.setItem("money", this.money);
        localStorage.setItem("clickPower", this.clickPower);
        localStorage.setItem("fightWins", this.fightWins);
        localStorage.setItem("businessesOwned", JSON.stringify(this.businessesOwned));
    }
}

class PvPGame {
    constructor() {
        this.resetGame();
    }

    resetGame() {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerAttack = 10;
        this.botAttack = 8;
        this.botBlockChance = 0.3;
        this.criticalHitChance = 0.1;
        this.canAct = true;
        this.botDefenseDown = false;
    }

    startBattle() {
        document.getElementById("game-container").style.display = "none";
        document.getElementById("battle-container").style.display = "block";
    }

    playerAttackAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = Math.random() < this.criticalHitChance ? this.playerAttack * 2 : this.playerAttack;
        if (Math.random() < this.botBlockChance) {
            alert("🛡️ Бот заблокировал удар!");
        } else {
            this.botHP -= damage;
            alert(`Ты ударил бота на ${damage} урона!`);
        }

        this.checkGameOver();
        setTimeout(() => this.botTurn(), 1000);
    }

    botTurn() {
        let damage = this.botAttack;
        if (Math.random() < 0.2) {
            alert("Хомо-бот упал и пропустил ход!");
        } else {
            game.money -= damage;
            alert(`Бот атаковал на ${damage} урона!`);
        }

        this.checkGameOver();
        this.canAct = true;
    }

    checkGameOver() {
        if (this.botHP <= 0) {
            alert("Ты победил! Доход за клик удвоен!");
            game.clickPower *= 2;
            game.updateUI();
            this.resetGame();
        }
    }

    surrender() {
        alert("Хомяки не сдаются!");
    }
}

const game = new Game();
const pvpGame = new PvPGame();
