// Создаём игровую логику
class Game {
    constructor() {
        this.money = parseInt(localStorage.getItem("money")) || 0;
        this.clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
        this.clickUpgradeCost = parseInt(localStorage.getItem("clickUpgradeCost")) || 20;
        this.cards = JSON.parse(localStorage.getItem("cards")) || [
            { name: "Маленький хомяк", cost: 10, income: 1, count: 0 },
            { name: "Средний хомяк", cost: 50, income: 5, count: 0 },
            { name: "Большой хомяк", cost: 200, income: 20, count: 0 }
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
            this.clickPower *= 2;  // Удваиваем силу клика
            this.clickUpgradeCost *= 2;  // Удваиваем цену улучшения
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
        `;

        this.updateUI();
        setInterval(() => this.generateIncome(), 1000);
    }
}

// Запускаем игру
const game = new Game();
