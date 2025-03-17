class Game {
    constructor() {
        this.money = 0;
        this.clickPower = 1;
        this.businesses = [
            { name: "Кафе «У Хомы»", price: 100, income: 10 },
            { name: "Зоопарк Хомяков", price: 1000, income: 75 },
            { name: "Хомячья качалка", price: 5000, income: 300 },
            { name: "АЗС «Хомяк»", price: 10000, income: 500 },
            { name: "Школа «ХОМАсапиенс»", price: 50000, income: 2000 },
            { name: "$HMSTR", price: 75000, income: 3000, warning: "Ты дурак? Не стоит это покупать!" },
            { name: "Автосалон «На хомяке»", price: 100000, income: 3500 },
            { name: "Игра «Hamster Combat»", price: 250000, income: 7500 }
        ];
        this.fightWins = 0;
        this.init();
    }

    init() {
        this.updateUI();
        this.displayBusinesses();
        setInterval(() => this.passiveIncome(), 1000);
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
    }

    passiveIncome() {
        this.businesses.forEach(biz => {
            if (biz.owned) this.money += biz.income;
        });
        this.updateUI();
    }

    buyBusiness(index) {
        let biz = this.businesses[index];
        if (this.money >= biz.price) {
            this.money -= biz.price;
            biz.owned = true;
            this.updateUI();
            this.displayBusinesses();
            if (biz.warning) alert(biz.warning);
        }
    }

    updateUI() {
        document.getElementById("money").textContent = this.money;
        document.getElementById("click-power").textContent = this.clickPower;
    }

    displayBusinesses() {
        let container = document.getElementById("business-container");
        container.innerHTML = "";
        this.businesses.forEach((biz, index) => {
            if (!biz.owned) {
                let card = document.createElement("div");
                card.classList.add("business-card");
                card.innerHTML = `<h3>${biz.name}</h3>
                                  <p>💰 Цена: ${biz.price}</p>
                                  <p>📈 Доход: ${biz.income}/сек</p>
                                  <button onclick="game.buyBusiness(${index})">Купить</button>`;
                container.appendChild(card);
            }
        });
    }
}

class PvpGame {
    constructor() {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerDamageBoost = 1;
        this.botBlockChance = 0.2;
        this.isPlayerTurn = true;
        this.init();
    }

    init() {
        document.getElementById("battle-container").style.display = "none";
    }

    startBattle() {
        document.getElementById("battle-container").style.display = "block";
        document.getElementById("game-title").style.display = "none";
        document.getElementById("balance-display").style.display = "none";
        document.getElementById("click-button").style.display = "none";
        document.getElementById("businesses-title").style.display = "none";
        document.getElementById("business-container").style.display = "none";
        document.getElementById("start-battle").style.display = "none";

        this.playerHP = 100;
        this.botHP = 100;
        this.updateBattleUI();
    }

    updateBattleUI() {
        document.getElementById("player-hp").textContent = this.playerHP;
        document.getElementById("bot-hp").textContent = this.botHP;
    }

    logAction(text) {
        let log = document.getElementById("battle-log");
        log.innerHTML += `<p>${text}</p>`;
    }

    playerAttackAction() {
        if (!this.isPlayerTurn) return;
        let damage = 10 * this.playerDamageBoost;
        if (Math.random() < this.botBlockChance) {
            this.logAction("🛡️ Бот заблокировал удар!");
        } else {
            this.botHP -= damage;
            this.logAction(`⚔️ Ты атаковал! Урон: ${damage}`);
        }
        this.endPlayerTurn();
    }

    biteAction() {
        if (!this.isPlayerTurn) return;
        this.playerDamageBoost += 0.5;
        this.logAction("🦷 Ты щелкнул зубами! Урон увеличен.");
        this.endPlayerTurn();
    }

    clawAction() {
        if (!this.isPlayerTurn) return;
        this.botBlockChance -= 0.1;
        this.logAction("🐾 Ты вытащил когти! Шанс блока бота уменьшен.");
        this.endPlayerTurn();
    }

    surrender() {
        alert("Хомяки не сдаются!");
    }

    endPlayerTurn() {
        this.updateBattleUI();
        if (this.botHP <= 0) {
            this.winBattle();
        } else {
            this.isPlayerTurn = false;
            setTimeout(() => this.botTurn(), 1500);
        }
    }

    botTurn() {
        if (Math.random() < 0.2) {
            this.logAction("😵 Бот упал и пропустил ход!");
        } else if (Math.random() < 0.3) {
            this.logAction("🦷 Бот щелкнул зубами! Его урон увеличен.");
        } else {
            let damage = 10;
            if (Math.random() < 0.2) {
                this.logAction("🛡️ Ты заблокировал удар!");
            } else {
                this.playerHP -= damage;
                this.logAction(`🤖 Бот атаковал! Урон: ${damage}`);
            }
        }

        this.updateBattleUI();
        if (this.playerHP <= 0) {
            this.loseBattle();
        } else {
            this.isPlayerTurn = true;
        }
    }

    winBattle() {
        alert("Ты победил! Доход за клик увеличен в 2 раза.");
        game.clickPower *= 2;
        this.endBattle();
    }

    loseBattle() {
        alert("Ты проиграл! Попробуй еще раз.");
        this.endBattle();
    }

    endBattle() {
        document.getElementById("battle-container").style.display = "none";
        document.getElementById("game-title").style.display = "block";
        document.getElementById("balance-display").style.display = "block";
        document.getElementById("click-button").style.display = "block";
        document.getElementById("businesses-title").style.display = "block";
        document.getElementById("business-container").style.display = "block";
        document.getElementById("start-battle").style.display = "block";
    }
}

const game = new Game();
const pvpGame = new PvpGame();
