document.addEventListener("DOMContentLoaded", () => {
    console.log("Страница загружена, скрипт выполняется.");
});

// Кликер
class Game {
    constructor() {
        this.money = parseInt(localStorage.getItem("money")) || 0;
        this.clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
        this.clickUpgradeCost = parseInt(localStorage.getItem("clickUpgradeCost")) || 20;
        this.fightWins = parseInt(localStorage.getItem("fightWins")) || 0;
        this.businesses = [
            { name: "Кафе «У Хомы»", cost: 100, income: 10, bought: false },
            { name: "Зоопарк Хомяков", cost: 1000, income: 75, bought: false },
            { name: "Хомячья качалка", cost: 5000, income: 300, bought: false },
            { name: "АЗС «Хомяк»", cost: 10000, income: 500, bought: false },
            { name: "Школа «Хома сапиенс»", cost: 50000, income: 2000, bought: false },
            { name: "$hmstr", cost: 100000, income: 0, bought: false },
            { name: "Автосалон «На хомяке»", cost: 100000, income: 3500, bought: false },
            { name: "Игра «Hamster Combat»", cost: 250000, income: 7500, bought: false }
        ];
        this.passiveIncome = 0;
        this.updateUI();
        this.startPassiveIncome();
    }

    updateUI() {
        document.getElementById("money").innerText = this.money;
        document.getElementById("click-power").innerText = this.clickPower;
        document.getElementById("click-upgrade-cost").innerText = this.clickUpgradeCost;
        localStorage.setItem("money", this.money);
        localStorage.setItem("clickPower", this.clickPower);
        localStorage.setItem("clickUpgradeCost", this.clickUpgradeCost);
        localStorage.setItem("fightWins", this.fightWins);
        this.updateBusinessList();
    }

    earnMoney() {
        this.money += this.clickPower;
        this.updateUI();
    }

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

    resetBalance() {
        this.money = 0;
        this.clickPower = 1;
        this.clickUpgradeCost = 20;
        this.fightWins = 0;
        this.passiveIncome = 0;
        this.businesses.forEach(b => b.bought = false);
        this.updateUI();
        alert("Баланс обнулён!");
    }

    buyBusiness(index) {
        let business = this.businesses[index];
        if (this.money >= business.cost && !business.bought) {
            this.money -= business.cost;
            business.bought = true;
            if (
