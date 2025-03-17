const game = {
    money: 0,
    clickPower: 1,
    businesses: [
        { name: "Кафе «У Хомы»", price: 100, income: 10, owned: false },
        { name: "Зоопарк Хомяков", price: 1000, income: 75, owned: false },
        { name: "Хомячья качалка", price: 5000, income: 300, owned: false },
        { name: "АЗС «Хомяк»", price: 10000, income: 500, owned: false },
        { name: "Школа «ХОМАсапиенс»", price: 50000, income: 2000, owned: false },
        { name: "$HMSTR", price: 75000, income: 3000, owned: false, warning: "Ты дурак? Не стоит это покупать!" },
        { name: "Автосалон «На хомяке»", price: 100000, income: 3500, owned: false },
        { name: "Игра «Hamster Combat»", price: 250000, income: 7500, owned: false }
    ],

    earnMoney: function () {
        this.money += this.clickPower;
        this.updateUI();
    },

    buyBusiness: function (index) {
        let business = this.businesses[index];
        if (business.owned || business.price > this.money) return;

        if (business.warning) {
            alert(business.warning);
            return;
        }

        this.money -= business.price;
        business.owned = true;
        this.updateUI();
    },

    updateUI: function () {
        document.getElementById("money").textContent = this.money;
        document.getElementById("click-power").textContent = this.clickPower;
        document.getElementById("click-button").textContent = `+${this.clickPower}`;

        let container = document.getElementById("business-container");
        container.innerHTML = "";
        this.businesses.forEach((biz, index) => {
            let div = document.createElement("div");
            div.className = "business-card";
            div.innerHTML = `
                <h3>${biz.name}</h3>
                <p>💰 Цена: ${biz.price}</p>
                <p>📈 Доход: ${biz.income} в секунду</p>
                ${biz.owned ? "<p style='color:green;'>✅ Куплено</p>" : `<button onclick="game.buyBusiness(${index})">Купить</button>`}
            `;
            container.appendChild(div);
        });
    },

    startIncome: function () {
        setInterval(() => {
            this.businesses.forEach(biz => {
                if (biz.owned) this.money += biz.income;
            });
            this.updateUI();
        }, 1000);
    }
};

document.getElementById("click-button").addEventListener("click", () => game.earnMoney());

game.updateUI();
game.startIncome();

// PVP-БОИ
const pvpGame = {
    playerHP: 100,
    botHP: 100,
    attackPower: 10,
    botMoves: ["Атака", "Защита", "Щелкнуть зубами", "Упасть"],
    playerTurn: true,

    startBattle: function () {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerTurn = true;
        document.getElementById("battle-container").style.display = "block";
        document.getElementById("battle-log").innerHTML = "";  
        this.updateBattleUI();
    },

    playerAttackAction: function () {
        if (!this.playerTurn) return;

        if (Math.random() < 0.1) {
            this.logBattle("🐹 Хомяк упал...");
            this.endTurn();
            return;
        }

        this.botHP -= this.attackPower;
        this.logBattle("⚔️ Ты атаковал бота!");
        this.endTurn();
    },

    playerSpecialAction: function (action) {
        if (!this.playerTurn) return;

        if (action === "Щелкнуть зубами") {
            this.attackPower += 5;
            this.logBattle("🐹 Ты щелкнул зубами! Урон увеличен.");
        } else if (action === "Вытащить когти") {
            this.botHP -= 15;
            this.logBattle("🐾 Ты вытащил когти и нанес урон!");
        } else if (action === "Сдаться") {
            this.playerHP = 0;
            this.logBattle("🏳 Ты сдался...");
        }

        this.endTurn();
    },

    endTurn: function () {
        this.playerTurn = false;
        setTimeout(() => this.botTurn(), 2000);
    },

    botTurn: function () {
        let move = this.botMoves[Math.floor(Math.random() * this.botMoves.length)];

        if (move === "Атака") {
            this.playerHP -= 10;
            this.logBattle("🤖 ХОМО-Бот атаковал!");
        } else if (move === "Защита") {
            this.logBattle("🤖 ХОМО-Бот заблокировал удар!");
        } else if (move === "Щелкнуть зубами") {
            this.attackPower += 5;
            this.logBattle("🤖 ХОМО-Бот щелкнул зубами, его атака увеличена!");
        } else if (move === "Упасть") {
            this.logBattle("🤖 ХОМО-Бот упал...");
        }

        this.playerTurn = true;
        this.updateBattleUI();
    },

    logBattle: function (message) {
        let log = document.getElementById("battle-log");
        let newMessage = document.createElement("p");
        newMessage.textContent = message;
        log.appendChild(newMessage);
    },

    updateBattleUI: function () {
        document.getElementById("player-hp").textContent = this.playerHP;
        document.getElementById("bot-hp").textContent = this.botHP;

        if (this.playerHP <= 0) {
            this.logBattle("❌ Ты проиграл!");
            document.getElementById("battle-container").style.display = "none";
        } else if (this.botHP <= 0) {
            this.logBattle("🎉 Ты победил! Доход за клик увеличен в 2 раза!");
            game.clickPower *= 2;
            game.updateUI();
            document.getElementById("battle-container").style.display = "none";
        }
    }
};

// Кнопки боя
document.getElementById("attack-button").addEventListener("click", () => pvpGame.playerAttackAction());
document.getElementById("bite-button").addEventListener("click", () => pvpGame.playerSpecialAction("Щелкнуть зубами"));
document.getElementById("claws-button").addEventListener("click", () => pvpGame.playerSpecialAction("Вытащить когти"));
document.getElementById("surrender-button").addEventListener("click", () => pvpGame.playerSpecialAction("Сдаться"));
document.getElementById("start-battle-button").addEventListener("click", () => pvpGame.startBattle());
