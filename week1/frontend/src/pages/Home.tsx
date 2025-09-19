import React from "react";
import ExpenseItem from "../components/ExpenseItem";
import type { Expense } from "../types/Expense";

const expenses: Expense[] = [
  {
    id: "e1",
    date: "2025-09-01",
    description: "Groceries",
    payer: "Alice",
    amount: 54.23,
  },
  {
    id: "e2",
    date: "2025-09-05",
    description: "Utilities",
    payer: "Bob",
    amount: 120.5,
  },
  {
    id: "e3",
    date: "2025-09-10",
    description: "Dinner",
    payer: "Charlie",
    amount: 75.0,
  },
];

interface HomeProps {
  expenses: Expense[];
}

const Home: React.FC<HomeProps> = ({ expenses }) => {
  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default function HomePage() {
  return <Home expenses={expenses} />;
}
