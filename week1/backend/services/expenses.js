const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/expenses.json");

function getAllExpenses() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading expenses:", error);
    return [];
  }
}

function addExpense(expense) {
  try {
    const expenses = getAllExpenses();
    expenses.push(expense);
    fs.writeFileSync(dataPath, JSON.stringify(expenses, null, 2));
    return expense;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
}

module.exports = {
  getAllExpenses,
  addExpense,
};
