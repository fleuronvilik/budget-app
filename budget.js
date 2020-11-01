class Budget {
  constructor() {
    this.budget = 0;
    this.expenses = [];
    this.totalExpenses = 0;
  }

  get getBudget() {
    return this.budget;
  }

  get balance() {
    return this.budget - this.totalExpenses;
  }

  addExpense(description, amount) {
    this.expenses.push({ description, amount });
    this.totalExpenses = this.expenses.reduce(function(totalExpenses, expense) {
      return totalExpenses + expense.amount;
    }, 0);
  }

  removeExpense(index) {
    this.expenses.splice(index, 1);
    this.totalExpenses = this.expenses.reduce(function(totalExpenses, expense) {
      return totalExpenses + expense.amount;
    }, 0);
  }

  setBudget(newAmount) {
    this.budget = newAmount;
  }
}

//var test = new Budget()
//test.setBudget(450)
//test.addExpense("Xing ProfilBilder Premium", 12)
//test.addExpense("Bus aller-retour", 7)
//test.addExpense("Loyer", 235)
