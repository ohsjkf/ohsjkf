const game = {
    money: 0,
    clickPower: 1,
    businesses: [
        { name: "Кафе «У Хомы»", price: 100, income: 10, owned: false },
        { name: "Зоопарк Хомяков", price: 1000, income: 75, owned: false },
        { name: "Хомячья качалка", price: 5000, income: 300, owned: false },
        { name: "АЗС «Хомяк»", price: 10000, income: 500, owned: false },
        { name: "Школа «Хома Сапиенс»", price: 50000, income: 2000, owned: false },
        { name: "$HMSTR", price: 75000, income: 3000, owned: false, warning: "Ты дурак? Не стоит это покупать" },
        { name: "Автосалон «На хомяке»", price: 100000, income: 3500, owned: false },
        { name: "Игра «Hamster Combat»", price: 250000, income: 7500, owned: false }
    ],

    earnMoney: function () {
        this.money += this.clickPower;
        this.updateUI();
    },

    buyBusiness: function (index) {
        let business = this.businesses[index];
        if (!business.owned && this.money >= business.price) {
            this.money -= business.price;
            business.owned = true;
            if (business.warning) alert(business.warning);
            this.updateUI();
        }
    },

    updateUI: function () {
        document.getElementById("money").textContent = this.money;
        document.getElementById("click-power").textContent = this.clickPower;
        
        let businessContainer = document.getElementById("business-container");
        businessContainer.innerHTML = "";
        this.businesses.forEach((business, index) => {
            let div = document.createElement("div");
            div.classList.add("business-card");
            div.innerHTML = `<h3>${business.name}</h3>
                <p>Цена: ${business.price} монет</p>
                <p>Доход: ${business.income} в секунду</p>
                ${business.owned ? "<p>Куплено</p>" : `<button onclick="game.buyBusiness(${index})">Купить</button>`}`;
            businessContainer.appendChild(div);
        });
    }
};

const pvpGame = {
    playerHP: 100,
    botHP: 100,
    attackPower: 10,
    biteBoost: 0,
    botMoves: ["Атака", "Защита", "Щелкнуть зубами", "Упасть"],
    
    startBattle: function () {
        this.playerHP = 100;
        this.botHP = 100;
        this.biteBoost = 0;
        document.getElementById("battle-container").style.display = "block";
        this.updateBattleUI();
    },

    playerAttackAction: function () {
        this.botHP -= this.attackPower + this.biteBoost;
        this.logBattle("Ты атаковал бота!");
        this.endTurn();
    },

    biteAction: function () {
        this.biteBoost += 5;
        this.logBattle("🦷 Ты щелкнул зубами, урон атаки увеличен!");
        this.endTurn();
    },

    clawAction: function () {
        this.logBattle("🐾 Ты вытащил когти, блок противника снижен!");
        this.endTurn();
    },

    surrender: function () {
        this.logBattle("🏳️ Хомяки не сдаются!");
        this.endTurn();
    },

    botTurn: function () {
        let move = this.botMoves[Math.floor(Math.random() * this.botMoves.length)];
        if (move === "Атака") {
            this.playerHP -= 10;
            this.logBattle("🤖 Бот атаковал!");
        } else if (move === "Защита") {
            this.logBattle("🤖 Бот заблокировал удар!");
        } else if (move === "Щелкнуть зубами") {
            this.logBattle("🤖 Бот щелкнул зубами, его атака увеличена!");
        } else if (move === "Упасть") {
            this.logBattle("🤖 Бот упал и пропустил ход!");
            return;
        }
        this.updateBattleUI();
        this.checkWin();
    },

    endTurn: function () {
        setTimeout(() => this.botTurn(), 1000);
        this.updateBattleUI();
        this.checkWin();
    },

    logBattle: function (text) {
        let log = document.getElementById("battle-log");
        log.innerHTML += `<p>${text}</p>`;
        log.scrollTop = log.scrollHeight;
    },

    updateBattleUI: function () {
        document.getElementById("player-hp").textContent = Math.max(0, this.playerHP);
        document.getElementById("bot-hp").textContent = Math.max(0, this.botHP);
    },

    checkWin: function () {
        if (this.botHP <= 0) {
            this.logBattle("🎉 Ты победил! Доход за клик увеличен в 2 раза!");
            game.clickPower *= 2;
            game.updateUI();
            setTimeout(() => document.getElementById("battle-container").style.display = "none", 2000);
        } else if (this.playerHP <= 0) {
            this.logBattle("💀 Ты проиграл!");
            setTimeout(() => document.getElementById("battle-container").style.display = "none", 2000);
        }
    }
};

setInterval(() => {
    game.businesses.forEach(b => {
        if (b.owned) game.money += b.income;
    });
    game.updateUI();
}, 1000);
