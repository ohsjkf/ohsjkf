const pvpGame = {
    playerHP: 100,
    botHP: 100,
    attackPower: 10,
    biteBoost: 0,
    botMoves: ["Атака", "Защита", "Щелкнуть зубами", "Упасть"],
    playerTurn: true,

    startBattle: function () {
        this.playerHP = 100;
        this.botHP = 100;
        this.biteBoost = 0;
        this.playerTurn = true;
        document.getElementById("battle-container").style.display = "block";
        document.getElementById("battle-log").innerHTML = "";  
        this.updateBattleUI();
    },

    playerAttackAction: function () {
        if (!this.playerTurn) return;  
        
        if (Math.random() < 0.2) {  
            this.logBattle("😵 Ты упал и пропустил ход!");
            this.endTurn();
            return;
        }
        
        this.botHP -= this.attackPower + this.biteBoost;
        this.logBattle("Ты атаковал бота!");
        this.endTurn();
    },

    biteAction: function () {
        if (!this.playerTurn) return;

        if (Math.random() < 0.2) {
            this.logBattle("😵 Ты упал и пропустил ход!");
            this.endTurn();
            return;
        }

        this.biteBoost += 5;
        this.logBattle("🦷 Ты щелкнул зубами, урон атаки увеличен!");
        this.endTurn();
    },

    clawAction: function () {
        if (!this.playerTurn) return;

        if (Math.random() < 0.2) {
            this.logBattle("😵 Ты упал и пропустил ход!");
            this.endTurn();
            return;
        }

        this.logBattle("🐾 Ты вытащил когти, блок противника снижен!");
        this.endTurn();
    },

    surrender: function () {
        if (!this.playerTurn) return;
        this.logBattle("🏳️ Хомяки не сдаются!");
        this.endTurn();
    },

    botTurn: function () {
        this.playerTurn = false;  
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
        this.playerTurn = true;
    },

    endTurn: function () {
        this.playerTurn = false;  
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
            if (!this.victoryProcessed) {
                this.victoryProcessed = true;
                this.logBattle("🎉 Ты победил! Доход за клик увеличен в 2 раза!");
                game.clickPower *= 2;
                game.updateUI();
                setTimeout(() => document.getElementById("battle-container").style.display = "none", 2000);
            }
        } else if (this.playerHP <= 0) {
            this.logBattle("💀 Ты проиграл!");
            setTimeout(() => document.getElementById("battle-container").style.display = "none", 2000);
        }
    }
};
