import React from "react";
import type { Expense } from "../types/Expense";

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <div className="expense-item">
      <div className="expense-item__description">
        <h2>{expense.description}</h2>
        <div className="expense-item__date">{expense.date}</div>
        <div className="expense-item__payer">Paid by: {expense.payer}</div>
      </div>
      <div className="expense-item__amount">${expense.amount.toFixed(2)}</div>
    </div>
  );
};

export default ExpenseItem;
