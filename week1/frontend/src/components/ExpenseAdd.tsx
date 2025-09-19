import React from "react";
import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  handleAdd: (expense: Expense) => void;
}

const payers = ["Alice", "Bob"];

const ExpenseAdd: React.FC<ExpenseAddProps> = ({ handleAdd }) => {
  const onAdd = () => {
    const randomPayer = payers[Math.floor(Math.random() * payers.length)];
    const randomAmount = parseFloat((Math.random() * 100).toFixed(2));
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: new Date().toISOString().slice(0, 10),
      description: "New Expense",
      payer: randomPayer,
      amount: randomAmount,
    };
    handleAdd(newExpense);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      <button className="expense-add-btn" onClick={onAdd}>
        Add
      </button>
    </div>
  );
};

export default ExpenseAdd;
