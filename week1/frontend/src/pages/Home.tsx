import React, { useState, useRef, useEffect } from "react";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseAdd from "../components/ExpenseAdd";
import type { Expense } from "../types/Expense";

const initialExpenses: Expense[] = [
  {
    id: "e1",
    date: "2023-10-01",
    description: "Groceries",
    payer: "Alice",
    amount: 150.75,
  },
  {
    id: "e2",
    date: "2023-10-03",
    description: "Utilities",
    payer: "Bob",
    amount: 80.5,
  },
  {
    id: "e3",
    date: "2023-10-05",
    description: "Dinner",
    payer: "Charlie",
    amount: 75.0,
  },
];

const HomePage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const listEndRef = useRef<HTMLDivElement | null>(null);

  const handleAdd = (newExpense: Expense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expenses]);

  return (
    <>
      <ExpenseAdd handleAdd={handleAdd} />
      <div className="expense-list">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
        <div ref={listEndRef} />
      </div>
    </>
  );
};

export default HomePage;
