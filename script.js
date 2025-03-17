const game = {
    money: 0,
    clickPower: 1,
    businesses: [
        { name: "Кафе «У Хомы»", price: 100, income: 10 },
        { name: "Зоопарк Хомяков", price: 1000, income: 75 },
        { name: "Хомячья качалка", price: 5000, income: 300 },
        { name: "АЗС «Хомяк»", price: 10000, income: 500 },
        { name: "Школа «Хома сапиенс»", price: 50000, income: 2000 },
        { name: "$HMSTR", price: 75000, income: 3000, special: true },
        { name: "Автосалон «На хомяке»", price: 100000, income: 3500 },
        { name: "Игра «Hamster Combat»", price: 250000, income: 7500 }
    ],

    earnMoney() {
        this.money += this.clickPower;
        document.getElementById("money").textContent = this.money;
        document.getElementById("click-power").textContent = this.clickPower;
    },

    buyBusiness(index) {
        let business = this.businesses[index];
        if (this.money >= business.price) {
            this.money -= business.price;
            setInterval(() => {
                this.money += business.income;
                document.getElementById("money").textContent = this.money;
            }, 1000);

            if (business.special) {
                alert("Ты дурак? Не стоит это покупать");
            }

            this.renderBusinesses();
        }
    },

    renderBusinesses() {
        let container = document.getElementById("business-container");
        container.innerHTML = "";
        this.businesses.forEach((b, i) => {
            let div = document.createElement("div");
            div.classList.add("business-card");
            div.innerHTML = `<h3>${b.name}</h3><p>💰 Цена: ${b.price}</p><p>📈 Доход: ${b.income}/сек</p>
            <button onclick="game.buyBusiness(${i})">Купить</button>`;
            container.appendChild(div);
        });
    }
};

const pvpGame = {
    playerHP: 100,
    botHP: 100,
    playerDamage: 10,
    botDamage: 10,

    startBattle() {
        this.playerHP = 100;
        this.botHP = 100;
        document.getElementById("player-hp").textContent = this.playerHP;
        document.getElementById("bot-hp").textContent = this.botHP;
        document.getElementById("battle-container").style.display = "block";
    },

    playerAttackAction() {
        let log = document.getElementById("battle-log");
        this.botHP -= this.playerDamage;
        log.innerHTML += `<p>⚔️ Ты ударил бота!</p>`;
        document.getElementById("bot-hp").textContent = this.botHP;

        setTimeout(() => this.botAction(), 1000);
    },

    biteAction() {
        let log = document.getElementById("battle-log");
        this.playerDamage += 5;
        log.innerHTML += `<p>🦷 Ты щелкнул зубами, урон атаки увеличен!</p>`;
    },

    clawAction() {
        let log = document.getElementById("battle-log");
        this.botDamage -= 3;
        log.innerHTML += `<p>🐾 Ты вытащил когти, вероятность блока у бота снижена!</p>`;
    },

    surrender() {
        let log = document.getElementById("battle-log");
        log.innerHTML += `<p>❌ Хомяки не сдаются!</p>`;
    },

    botAction() {
        let log = document.getElementById("battle-log");
        let random = Math.random();

        if (random < 0.2) {
            log.innerHTML += `<p>🤖 Бот упал!</p>`;
        } else if (random < 0.4) {
            log.innerHTML += `<p>🦷 Бот щелкнул зубами, его урон увеличен!</p>`;
            this.botDamage += 5;
        } else if (random < 0.6) {
            log.innerHTML += `<p>🐾 Бот вытащил когти, твоя защита снижена!</p>`;
            this.playerHP -= 5;
        } else {
            this.playerHP -= this.botDamage;
            log.innerHTML += `<p>🤖 Бот атаковал!</p>`;
        }

        document.getElementById("player-hp").textContent = this.playerHP;
    }
};

game.renderBusinesses();
