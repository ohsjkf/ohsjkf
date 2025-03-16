class Game {
    constructor() {
        this.money = parseInt(localStorage.getItem("money")) || 0;
        this.clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
        this.clickUpgradeCost = parseInt(localStorage.getItem("clickUpgradeCost")) || 20;
        this.cards = JSON.parse(localStorage.getItem("cards")) || [
            { name: "Кафе Эвкалипт", cost: 10, income: 1, count: 0 },
            { name: "Зоопарк хомяков", cost: 50, income: 3, count: 0 },
            { name: "Хомяковая качалка", cost: 200, income: 10, count: 0 }
        ];
        this.init();
    }

    // Обновляем интерфейс
    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;
        document.getElementById("click-upgrade-cost").innerText = this.clickUpgradeCost;
        localStorage.setItem("money", this.money);
        localStorage.setItem("clickPower", this.clickPower);
        localStorage.setItem("clickUpgradeCost", this.clickUpgradeCost);
        localStorage.setItem("cards", JSON.stringify(this.cards));

        let container = document.getElementById("cards-container");
        container.innerHTML = "";
        this.cards.forEach((card, index) => {
            let cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.innerHTML = `
                <h3>${card.name}</h3>
                <p>💰 Цена: ${card.cost} монет</p>
                <p>📈 Доход: +${card.income} монет/сек</p>
                <p>🛒 Куплено: ${card.count}</p>
                <button onclick="game.buyCard(${index})">Купить</button>
            `;
            container.appendChild(cardElement);
        });
    }

    // Получаем деньги за клик
    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();

        // Проверяем достижение 1 000 000 монет
        if (this.money >= 1000000) {
            setTimeout(() => {
                alert("Ты теперь хомяк-миллионер, но из-за постоянных нажатий тебе стало очень плохо...");
                alert("Игра окончена! Начни заново.");
                this.resetGame();
            }, 100);
        }
    }

    // Покупаем карточку улучшения
    buyCard(index) {
        if (this.money >= this.cards[index].cost) {
            this.money -= this.cards[index].cost;
            this.cards[index].count++;
            this.updateUI();
        } else {
            alert("Недостаточно монет!");
        }
    }

    // Улучшение кликов
    upgradeClick() {
        if (this.money >= this.clickUpgradeCost) {
            this.money -= this.clickUpgradeCost;
            this.clickPower *= 2;
            this.clickUpgradeCost *= 2;
            this.updateUI();
        } else {
            alert("Недостаточно монет!");
        }
    }

    // Генерируем автоматический доход
    generateIncome() {
        this.cards.forEach(card => {
            this.money += card.count * card.income;
        });
        this.updateUI();
    }

    // Обнуляем игру
    resetGame() {
        this.money = 0;
        this.clickPower = 1;
        this.clickUpgradeCost = 20;
        this.cards.forEach(card => (card.count = 0));
        localStorage.clear();
        this.updateUI();
        alert("Баланс обнулён! Начни с чистого листа.");
    }

    // Запуск игры
    init() {
        document.body.innerHTML = `
            <h1>🌿 Green Hamster Clicker 🌿</h1>
            <p class="money">💰 Баланс: <span id="money">0</span> монет</p>
            <button onclick="game.earnMoney()">🐹 Кликнуть (+<span id="click-power">1</span> монета)</button>
            <h2>Улучшение кликов</h2>
            <p>📈 Увеличение дохода за клик</p>
            <p>💰 Цена улучшения: <span id="click-upgrade-cost">20</span> монет</p>
            <button onclick="game.upgradeClick()">Улучшить клик</button>
            <h2>Карточки улучшений</h2>
            <div id="cards-container"></div>
            <button onclick="game.resetGame()">🔄 Обнулить баланс</button>
        `;

        this.updateUI();
        setInterval(() => this.generateIncome(), 1000);
    }
}

// Запускаем игру
const game = new Game();
