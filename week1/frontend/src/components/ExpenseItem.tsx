import React from "react";
import type { Expense } from "../types/Expense";
import { getPayerColorClass, getBorderColorClass } from "../utils/colorUtils";

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  const payerColorClass = getPayerColorClass(expense.payer);
  const borderColorClass = getBorderColorClass(expense.payer);

  return (
    <div
      className={`expense-item ${borderColorClass}`}
      data-payer={expense.payer}
    >
      <div className="expense-item__description">
        <h2>{expense.description}</h2>
        <div className="expense-item__date">{expense.date}</div>
        <div className={`expense-item__payer ${payerColorClass}`}>
          Paid by: {expense.payer}
        </div>
      </div>
      <div className="expense-item__amount">${expense.amount.toFixed(2)}</div>
    </div>
  );
};

export default ExpenseItem;
