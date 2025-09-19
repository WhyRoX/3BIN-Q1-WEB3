import React, { useState } from "react";
import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  handleAdd: (expense: Expense) => Promise<void>;
}

const payers = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Mahmoud"];
const descriptions = [
  "Groceries",
  "Coffee",
  "Lunch",
  "Gas",
  "Parking",
  "Dinner",
  "Movie tickets",
  "Uber ride",
  "Utilities",
  "Office supplies",
];

const ExpenseAdd: React.FC<ExpenseAddProps> = ({ handleAdd }) => {
  const [isAdding, setIsAdding] = useState(false);

  const onAdd = async () => {
    if (isAdding) return;

    setIsAdding(true);
    try {
      const randomPayer = payers[Math.floor(Math.random() * payers.length)];
      const randomAmount = parseFloat((Math.random() * 100).toFixed(2));
      const randomDescription =
        descriptions[Math.floor(Math.random() * descriptions.length)];

      const newExpense: Expense = {
        id: Date.now().toString(),
        date: new Date().toISOString().slice(0, 10),
        description: randomDescription,
        payer: randomPayer,
        amount: randomAmount,
      };

      await handleAdd(newExpense);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button className="expense-add-btn" onClick={onAdd} disabled={isAdding}>
      {isAdding ? "Adding..." : "✨ Add Random Expense"}
    </button>
  );
};

export default ExpenseAdd;
