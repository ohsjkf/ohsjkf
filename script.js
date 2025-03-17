class Game {
    constructor() {
        this.money = 0;
        this.clickPower = 1;
        this.businesses = [
            { name: "Мини-ферма", cost: 50, income: 2 },
            { name: "Магазин хомячьих товаров", cost: 200, income: 10 },
        ];
        this.fightWins = 0;
        this.updateUI();
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
    }

    buyBusiness(index) {
        let business = this.businesses[index];
        if (this.money >= business.cost) {
            this.money -= business.cost;
            business.income += Math.floor(business.income * 0.2);
            this.updateUI();
        }
    }

    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;
        this.updateBusinesses();
    }

    updateBusinesses() {
        let container = document.getElementById("business-container");
        container.innerHTML = "";
        this.businesses.forEach((business, index) => {
            let div = document.createElement("div");
            div.classList.add("business-card");
            div.innerHTML = `
                <h3>${business.name}</h3>
                <p>💰 Прибыль: ${business.income}/сек</p>
                <button onclick="game.buyBusiness(${index})">Купить за ${business.cost} монет</button>
            `;
            container.appendChild(div);
        });
    }
}

class PvPGame {
    constructor() {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerAttack = 10;
        this.botAttack = 8;
        this.botBlockChance = 0.3;
        this.playerBlockChance = 0.2;
        this.criticalHitChance = 0.1;
        this.damageBoost = 1;
    }

    startBattle() {
        document.getElementById("battle-container").style.display = "block";
        document.getElementById("start-battle").style.display = "none";
        document.getElementById("click-button").style.display = "none";
        document.getElementById("business-title").style.display = "none";
        document.getElementById("business-container").style.display = "none";
        game.updateUI();
    }

    playerAttackAction() {
        if (Math.random() < 0.1) {
            alert("Ты споткнулся и пропустил ход!");
            this.botTurn();
            return;
        }

        let damage = this.playerAttack * this.damageBoost;
        if (Math.random() < this.criticalHitChance) {
            damage *= 2;
            alert("💥 Критический удар! Урон удвоен!");
        }

        if (Math.random() < this.botBlockChance) {
            alert("🛡️ Бот заблокировал удар!");
        } else {
            this.botHP -= damage;
            alert(`Ты ударил бота на ${damage} урона!`);
        }
        this.damageBoost = 1; // Сброс буста после удара
        this.checkGameOver();
        this.botTurn();
    }

    biteAction() {
        this.damageBoost += 0.5;
        alert("Ты наточил зубы! Следующая атака будет сильнее.");
        this.botTurn();
    }

    clawAction() {
        let damage = 5;
        this.botHP -= damage;
        alert(`Ты поцарапал бота, нанеся ${damage} урона!`);
        this.checkGameOver();
        this.botTurn();
    }

    botTurn() {
        if (Math.random() < this.playerBlockChance) {
            alert("🛡️ Ты заблокировал атаку бота!");
        } else {
            this.playerHP -= this.botAttack;
            alert(`Бот атаковал на ${this.botAttack} урона!`);
        }
        this.checkGameOver();
    }

    surrender() {
        alert("Ты сдался! Попробуй еще раз.");
        this.resetGame();
    }

    checkGameOver() {
        document.getElementById("player-hp").innerText = this.playerHP;
        document.getElementById("bot-hp").innerText = this.botHP;

        if (this.botHP <= 0) {
            alert("Ты победил! Доход за клик увеличен в 2 раза.");
            game.clickPower *= 2;
            game.fightWins++;
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
        document.getElementById("start-battle").style.display = "block";
        document.getElementById("click-button").style.display = "block";
        document.getElementById("business-title").style.display = "block";
        document.getElementById("business-container").style.display = "block";
        game.updateUI();
    }
}

const game = new Game();
const pvpGame = new PvPGame();
