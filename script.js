class Game {
    constructor() {
        this.money = 0;
        this.clickPower = 1;
        this.businesses = [
            { name: "Кафе «У Хомы»", price: 100, income: 10, owned: false },
            { name: "Зоопарк Хомяков", price: 1000, income: 75, owned: false },
            { name: "Хомячья качалка", price: 5000, income: 300, owned: false },
            { name: "АЗС «Хомяк»", price: 10000, income: 500, owned: false },
            { name: "Школа ХОМАсапиенс", price: 50000, income: 2000, owned: false },
            { name: "$hmstr", price: 100000, income: 0, owned: false },
            { name: "Автосалон «На хомяке»", price: 100000, income: 3500, owned: false },
            { name: "Игра «Hamster Combat»", price: 250000, income: 7500, owned: false }
        ];
        this.fightWins = 0;
        this.updateUI();
        setInterval(() => this.collectIncome(), 1000);
    }

    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;
        this.renderBusinesses();
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
    }

    collectIncome() {
        this.businesses.forEach(business => {
            if (business.owned) {
                this.money += business.income;
            }
        });
        this.updateUI();
    }

    buyBusiness(index) {
        let business = this.businesses[index];
        if (!business.owned && this.money >= business.price) {
            this.money -= business.price;
            business.owned = true;
            if (business.name === "$hmstr") alert("Ты дурак? Не стоит это покупать.");
            this.updateUI();
        } else {
            alert("Недостаточно монет!");
        }
    }

    renderBusinesses() {
        let businessList = document.getElementById("business-list");
        businessList.innerHTML = "";
        this.businesses.forEach((business, index) => {
            let div = document.createElement("div");
            div.className = "business-card";
            div.innerHTML = `
                <h3>${business.name}</h3>
                <p>💰 Стоимость: ${business.price}</p>
                <p>📈 Доход: ${business.income} в сек.</p>
                ${business.owned ? "<p>✅ Куплено</p>" : `<button onclick="game.buyBusiness(${index})">Купить</button>`}
            `;
            businessList.appendChild(div);
        });
    }
}

class PvPGame {
    constructor() {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerAttack = 10;
        this.botAttack = 8;
        this.blockChance = 0.3;
        this.criticalChance = 0.1;
        this.canAct = true;
    }

    startBattle() {
        document.getElementById("start-battle").style.display = "none";
        document.getElementById("battle-container").style.display = "flex";
        document.getElementById("business-container").style.display = "none";
        document.getElementById("click-section").style.display = "none";
        document.querySelector("h1").style.display = "none";
        document.querySelector("p").style.display = "none";
        document.getElementById("battle-container").scrollIntoView();
    }

    endBattle() {
        document.getElementById("start-battle").style.display = "block";
        document.getElementById("battle-container").style.display = "none";
        document.getElementById("business-container").style.display = "flex";
        document.getElementById("click-section").style.display = "block";
        document.querySelector("h1").style.display = "block";
        document.querySelector("p").style.display = "block";
    }

    playerAttackAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = Math.random() < this.criticalChance ? this.playerAttack * 2 : this.playerAttack;
        let blocked = Math.random() < this.blockChance;

        if (blocked) {
            alert("🤖 Бот заблокировал атаку!");
        } else {
            this.botHP -= damage;
            document.getElementById("bot-hp").innerText = this.botHP;
            alert(`💥 Ты ударил бота на ${damage} урона!`);
        }
        this.checkGameOver();
        setTimeout(() => this.botTurn(), 2000);
    }

    botTurn() {
        let blocked = Math.random() < this.blockChance;
        let damage = this.botAttack;

        if (blocked) {
            alert("🛡️ Ты заблокировал атаку бота!");
        } else {
            this.playerHP -= damage;
            document.getElementById("player-hp").innerText = this.playerHP;
            alert(`🤖 Бот атаковал тебя на ${damage} урона!`);
        }
        this.canAct = true;
        this.checkGameOver();
    }

    biteAction() {
        if (!this.canAct) return;
        this.canAct = false;
        this.playerAttack += 2;
        alert("🦷 Ты щелкнул зубами! Урон немного увеличен.");
        setTimeout(() => this.botTurn(), 2000);
    }

    clawAction() {
        if (!this.canAct) return;
        this.canAct = false;
        this.blockChance = 0.1;
        alert("🐾 Ты вытащил когти! Теперь сложнее заблокировать атаки.");
        setTimeout(() => this.botTurn(), 2000);
    }

    surrender() {
        alert("Хомяки не сдаются!");
    }

    checkGameOver() {
        if (this.botHP <= 0) {
            alert("🎉 Ты победил! Теперь твой доход за клик увеличен в 2 раза!");
            if (game.fightWins < 10) {
                game.clickPower *= 2;
                game.fightWins++;
            }
            game.updateUI();
            this.resetGame();
        } else if (this.playerHP <= 0) {
            alert("😔 Ты проиграл...");
            this.resetGame();
        }
    }

    resetGame() {
        this.playerHP = 100;
        this.botHP = 100;
        this.canAct = true;
        this.endBattle();
    }
}

const game = new Game();
const pvpGame = new PvPGame();
