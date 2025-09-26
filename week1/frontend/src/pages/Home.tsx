import React, { useState, useRef, useEffect } from "react";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseSorter, { type SortOption } from "../components/ExpenseSorter";
import { expenseService } from "../services/expenseService";
import { sortExpenses } from "../utils/colorUtils";
import type { Expense } from "../types/Expense";
import ExpenseAddForm from "../components/ExpenseAddForm";

const HomePage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<SortOption>("date-newest");
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

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  // Sort expenses based on current sort option
  const sortedExpenses = sortExpenses(expenses, sortOption);

  //   useEffect(() => {
  //     if (listEndRef.current) {
  //       listEndRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, [expenses]);

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
      {/* Sticky Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-brand">
            <span className="navbar-logo">💰</span>
            <h1 className="navbar-title">ExpenseTracker</h1>
          </a>
          
          <ul className="navbar-nav">
            <li><a href="#dashboard" className="navbar-link active">Dashboard</a></li>
            <li><a href="#expenses" className="navbar-link">Expenses</a></li>
            <li><a href="#analytics" className="navbar-link">Analytics</a></li>
          </ul>
          
          <div className="navbar-stats">
            <div className="navbar-stat">
              Total: <span className="navbar-stat-value">{expenses.length}</span>
            </div>
            <div className="navbar-stat">
              Amount: <span className="navbar-stat-value">
                ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="page-header">
        <h1>💰 Expense Tracker</h1>
        <p>Keep track of your shared expenses</p>
      </div>
      <div className="actions-container">
        <ExpenseAdd handleAdd={handleAdd} />
        <ExpenseAddForm handleAdd={handleAdd} />
        <button
          className="reset-button"
          onClick={handleReset}
          disabled={isResetting || expenses.length === 0}
        >
          {isResetting ? "Resetting..." : "🔄 Reset Data"}
        </button>
      </div>
      {expenses.length > 0 && (
        <ExpenseSorter
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
      )}
      <div className="expense-list">
        {expenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No expenses yet</h3>
            <p>Add your first expense using the button above!</p>
          </div>
        ) : (
          sortedExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        )}
        <div ref={listEndRef} />
      </div>
    </>
  );
};

export default HomePage;
