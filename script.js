class Game {
    constructor() {
        this.money = parseInt(localStorage.getItem("money")) || 0;
        this.clickPower = 1;
        this.businesses = [
            { name: "Кафе «У Хомы»", cost: 100, income: 10, bought: false },
            { name: "Зоопарк Хомяков", cost: 1000, income: 75, bought: false },
            { name: "Хомячья качалка", cost: 5000, income: 300, bought: false },
            { name: "АЗС «Хомяк»", cost: 10000, income: 500, bought: false },
            { name: "Школа «ХОМАсапиенс»", cost: 50000, income: 2000, bought: false },
            { name: "$hmstr", cost: 75000, income: 0, bought: false },
            { name: "Автосалон «На хомяке»", cost: 100000, income: 3500, bought: false },
            { name: "Игра «Hamster Combat»", cost: 250000, income: 7500, bought: false }
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

    renderBusinesses() {
        const list = document.getElementById("business-list");
        list.innerHTML = "";
        this.businesses.forEach((biz, index) => {
            if (!biz.bought) {
                let li = document.createElement("li");
                li.innerHTML = `${biz.name} - ${biz.cost} монет (Доход: ${biz.income} в сек.) 
                <button onclick="game.buyBusiness(${index})">Купить</button>`;
                list.appendChild(li);
            }
        });
    }

    buyBusiness(index) {
        let biz = this.businesses[index];
        if (this.money >= biz.cost) {
            this.money -= biz.cost;
            biz.bought = true;
            alert(`Ты купил ${biz.name}!`);
            this.updateUI();
        } else {
            alert("Недостаточно монет!");
        }
    }

    collectIncome() {
        this.businesses.forEach(biz => {
            if (biz.bought) {
                this.money += biz.income;
            }
        });
        this.updateUI();
    }
}

class PvPGame {
    constructor() {
        this.playerHP = 100;
        this.botHP = 100;
        this.playerAttack = 10;
        this.botAttack = 8;
        this.playerBlockChance = 0.2;
        this.botBlockChance = 0.3;
        this.criticalHitChance = 0.1;
        this.fallChance = 0.1;
        this.isPlayerTurn = true;
    }

    startBattle() {
        document.getElementById("start-battle").style.display = "none";
        document.getElementById("battle-container").style.display = "block";
        document.querySelector("h1").style.display = "none";
        document.querySelectorAll("button:not(#attack-btn, #bite-btn, #claw-btn, #surrender-btn)").forEach(btn => btn.style.display = "none");
    }

    checkFall() {
        if (Math.random() < this.fallChance) {
            alert("😵 Хомяк упал! Ты пропускаешь ход...");
            this.isPlayerTurn = false;
            setTimeout(() => this.botTurn(), 1500);
            return true;
        }
        return false;
    }

    playerAttackAction() {
        if (!this.isPlayerTurn) return;
        if (this.checkFall()) return;

        let damage = this.playerAttack;
        let isCritical = Math.random() < this.criticalHitChance;
        if (isCritical) {
            damage *= 2;
            alert("⚡ Критический удар! Урон удвоен!");
        }

        let botBlocked = Math.random() < this.botBlockChance;
        if (botBlocked) {
            alert("🤖 Бот заблокировал атаку!");
        } else {
            this.botHP -= damage;
            alert(`💥 Ты ударил бота на ${damage} урона!`);
        }

        this.checkGameOver();
        if (this.botHP > 0) {
            this.isPlayerTurn = false;
            setTimeout(() => this.botTurn(), 1500);
        }
    }

    botTurn() {
        if (Math.random() < this.fallChance) {
            alert("🤖 Бот упал! Он пропустил ход.");
            this.isPlayerTurn = true;
            return;
        }

        let playerBlocked = Math.random() < this.playerBlockChance;
        if (playerBlocked) {
            alert("🛡️ Ты заблокировал атаку бота!");
        } else {
            this.playerHP -= this.botAttack;
            alert(`🤖 Бот атаковал тебя на ${this.botAttack} урона!`);
        }

        this.checkGameOver();
        this.isPlayerTurn = true;
    }

    biteAction() {
        if (!this.isPlayerTurn) return;
        this.playerAttack += 5;
        alert("🦷 Ты щелкнул зубами! Теперь твой урон увеличен на 5!");
    }

    clawAction() {
        if (!this.isPlayerTurn) return;
        this.botBlockChance = 0.1;
        alert("🐾 Ты вытащил когти! Бот теперь хуже блокирует атаки.");
    }

    surrender() {
        alert("Хомяки не сдаются!");
    }

    checkGameOver() {
        if (this.botHP <= 0) {
            alert("🎉 Ты победил!");
        } else if (this.playerHP <= 0) {
            alert("💀 Ты проиграл!");
        }
    }
}

const game = new Game();
const pvpGame = new PvPGame();
