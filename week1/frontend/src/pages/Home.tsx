import React, { useState, useRef, useEffect } from "react";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseAdd from "../components/ExpenseAdd";
import { expenseService } from "../services/expenseService";
import type { Expense } from "../types/Expense";

const HomePage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const listEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await expenseService.getAllExpenses();
        setExpenses(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const handleAdd = async (newExpense: Expense) => {
    try {
      const addedExpense = await expenseService.addExpense(newExpense);
      setExpenses((prev) => [...prev, addedExpense]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleReset = async () => {
    if (isResetting) return;

    setIsResetting(true);
    try {
      setError(null);
      const response = await expenseService.resetExpenses();
      setExpenses(response.expenses);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsResetting(false);
    }
  };

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expenses]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading expenses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>💰 Expense Tracker</h1>
        <p>Keep track of your shared expenses</p>
      </div>
      <div className="actions-container">
        <ExpenseAdd handleAdd={handleAdd} />
        <button
          className="reset-button"
          onClick={handleReset}
          disabled={isResetting || expenses.length === 0}
        >
          {isResetting ? "Resetting..." : "🔄 Reset Data"}
        </button>
      </div>
      <div className="expense-list">
        {expenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No expenses yet</h3>
            <p>Add your first expense using the button above!</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        )}
        <div ref={listEndRef} />
      </div>
    </>
  );
};

export default HomePage;
