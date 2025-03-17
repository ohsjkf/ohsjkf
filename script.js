class Game {
    constructor() {
        this.money = 0;
        this.clickPower = 1;
        this.fightWins = 0;
        this.businesses = [
            { name: "🏫 Школа ХОМАсапиенс", cost: 100, profit: 5, owned: 0 },
            { name: "🍩 Кафе Хомяк-Гурман", cost: 500, profit: 20, owned: 0 }
        ];
        this.updateUI();
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
    }

    updateUI() {
        document.getElementById("money").textContent = this.money;

        let businessList = document.getElementById("business-list");
        businessList.innerHTML = "";
        this.businesses.forEach((business, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<div class="business-card">
                <p>${business.name}</p>
                <p>💰 Стоимость: ${business.cost}</p>
                <p>📈 Прибыль: ${business.profit} / сек</p>
                <button onclick="game.buyBusiness(${index})">Купить</button>
            </div>`;
            businessList.appendChild(li);
        });
    }

    buyBusiness(index) {
        let business = this.businesses[index];
        if (this.money >= business.cost) {
            this.money -= business.cost;
            business.owned++;
            this.updateUI();
        } else {
            alert("Недостаточно монет!");
        }
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
        this.canAct = true;
    }

    startBattle() {
        document.getElementById("start-battle").style.display = "none";
        document.getElementById("battle-container").style.display = "block";

        document.getElementById("game-title").style.display = "none";
        document.getElementById("balance-text").style.display = "none";
        document.getElementById("click-btn").style.display = "none";
        document.getElementById("businesses-title").style.display = "none";
        document.getElementById("business-list").style.display = "none";
    }

    playerAttackAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = this.playerAttack * (Math.random() < this.criticalHitChance ? 2 : 1);
        if (Math.random() < this.botBlockChance) {
            alert("Бот заблокировал удар!");
        } else {
            this.botHP -= damage;
            document.getElementById("bot-hp").textContent = this.botHP;
            alert(`Ты ударил бота на ${damage} урона!`);
        }

        setTimeout(() => this.botTurn(), 1500);
    }

    clawAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = this.playerAttack * 0.8;
        this.botHP -= damage;
        document.getElementById("bot-hp").textContent = this.botHP;
        alert(`Ты поцарапал бота на ${damage} урона!`);

        setTimeout(() => this.botTurn(), 1500);
    }

    biteAction() {
        if (!this.canAct) return;
        this.canAct = false;

        let damage = this.playerAttack * 0.6;
        this.botHP -= damage;
        document.getElementById("bot-hp").textContent = this.botHP;
        alert(`Ты укусил бота на ${damage} урона!`);

        setTimeout(() => this.botTurn(), 1500);
    }

    botTurn() {
        if (this.botHP <= 0) {
            this.endBattle(true);
            return;
        }

        let damage = this.botAttack * (Math.random() < this.criticalHitChance ? 2 : 1);
        if (Math.random() < this.playerBlockChance) {
            alert("Ты заблокировал удар!");
        } else {
            this.playerHP -= damage;
            document.getElementById("player-hp").textContent = this.playerHP;
            alert(`Бот ударил тебя на ${damage} урона!`);
        }

        if (this.playerHP <= 0) {
            this.endBattle(false);
        } else {
            this.canAct = true;
        }
    }

    endBattle(playerWon) {
        alert(playerWon ? "Ты победил! Доход за клик увеличен!" : "Ты проиграл!");
        if (playerWon) {
            game.clickPower *= 2;
        }
        game.updateUI();
        location.reload();
    }
}

let game = new Game();
let pvpGame = new PvPGame();
