document.addEventListener("DOMContentLoaded", () => {
    window.game = new Game();
    window.pvpGame = new PvPGame();

    document.getElementById("click-btn").addEventListener("click", () => game.earnMoney());
    document.getElementById("reset-balance").addEventListener("click", () => game.resetBalance());
    document.getElementById("start-battle").addEventListener("click", () => pvpGame.startBattle());
    document.getElementById("attack-btn").addEventListener("click", () => pvpGame.playerAttackAction());
    document.getElementById("bite-btn").addEventListener("click", () => pvpGame.biteAction());
    document.getElementById("claw-btn").addEventListener("click", () => pvpGame.clawAction());
    document.getElementById("surrender-btn").addEventListener("click", () => pvpGame.surrender());
});

class Game {
    constructor() {
        this.money = 0;
        this.clickPower = 1;
        this.fightWins = 0;
        this.businesses = [
            { name: "Кафе «У Хомы»", price: 100, income: 10 },
            { name: "Зоопарк Хомяков", price: 1000, income: 75 },
            { name: "Хомячья качалка", price: 5000, income: 300 },
            { name: "АЗС «Хомяк»", price: 10000, income: 500 },
            { name: "ХОМАсапиенс", price: 50000, income: 2000 },
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
        this.updateBusinessList();
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
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
                let card = document.createElement("div");
                card.className = "business-card";
                card.innerHTML = `<h3>${business.name}</h3>
                    <p>Цена: ${business.price} монет</p>
                    <p>Доход: ${business.income} монет/сек</p>
                    <button onclick="game.buyBusiness(${index})">Купить</button>`;
                list.appendChild(card);
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
        this.fightWins = 0;
        this.ownedBusinesses = [];
        this.incomePerSecond = 0;
        this.updateUI();
        alert("Баланс обнулён!");
    }
}

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

    botTurn() {
        this.playerHP -= this.botAttack;
        alert(`Бот атаковал на ${this.botAttack} урона!`);
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
