var [budget, expenses, balance] = document.getElementsByTagName("span");

var budgetForm = document.getElementById("budget-form");
var expenseForm = document.getElementById("expense-form");
var tableOfExpenses = document.querySelector("table");

var expensesCount = 0;

budgetForm.addEventListener("submit", function(e) {
  e.preventDefault();
  var budget = Number(this.elements[0].value);
  test.setBudget(budget);
  this.reset();
  updateStatus();
});

expenseForm.addEventListener("submit", function(e) {
  e.preventDefault();
  var description = this.elements[0].value;
  var amount = Number(this.elements[1].value);
  //console.log(description, amount)
  test.addExpense(description, amount);
  this.reset();
  updateStatus();
  updateExpensesList(description, amount);
});

var test = new Budget();

function updateStatus() {
  budget.innerText = test.budget;
  expenses.innerText = test.totalExpenses;
  balance.innerText = test.balance;
}

function updateExpensesList(description, amount) {
  var newRow = document.createElement("tr");
  newRow.setAttribute("data-index", expensesCount);
  newRow.innerHTML = `
        <td>${description}</td>
        <td>${amount}</td>
        <td><span class="edit">Edit - <span class="del">Delete</span></td>
    `;
  var edit = newRow.querySelector(".edit");
  edit.addEventListener("click", function(e) {
    e.stopPropagation();
    expenseForm.elements[0].value = description;
    expenseForm.elements[1].value = amount;
    deleteRow(e, newRow);
  });
  var del = newRow.querySelector(".del");
  del.addEventListener("click", function(e) {
    e.stopPropagation();
    deleteRow(e, newRow);
  });
  tableOfExpenses.appendChild(newRow);
  expensesCount++;
}

function deleteRow(e, row) {
  var deletedRow = row;
  var index = Number(deletedRow.dataset.index);
  test.removeExpense(index);
  while (deletedRow.nextElementSibling) {
    deletedRow = deletedRow.nextElementSibling;
    index = Number(deletedRow.dataset.index);
    //deletedRow.setAttribute("data-index", index) doesn't work
    deletedRow.dataset.index = index - 1;
    updateStatus();
  }
  row.parentNode.removeChild(row);
  updateStatus();
  expensesCount--;
}
