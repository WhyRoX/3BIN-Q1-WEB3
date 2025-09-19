const express = require("express");
const router = express.Router();
const {
  getAllExpenses,
  addExpense,
  resetExpenses,
} = require("../services/expenses");

// GET /expenses - Return all expenses
router.get("/expenses", (req, res) => {
  try {
    const expenses = getAllExpenses();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve expenses" });
  }
});

// POST /expenses - Add a new expense
router.post("/expenses", (req, res) => {
  try {
    const { id, date, description, payer, amount } = req.body;

    if (!id || !date || !description || !payer || amount === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newExpense = { id, date, description, payer, amount };
    const addedExpense = addExpense(newExpense);

    res.status(201).json(addedExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// POST /expenses/reset - Reset expenses to initial state
router.post("/expenses/reset", (req, res) => {
  try {
    const resetData = resetExpenses();
    res.json({
      message: "Expenses reset to initial state successfully",
      expenses: resetData,
    });
  } catch (error) {
    console.error("Reset expenses error:", error);
    res.status(500).json({ error: "Failed to reset expenses" });
  }
});

module.exports = router;
