import type { Expense } from "../types/Expense";

const API_BASE_URL = "http://localhost:3000/api";

export const expenseService = {
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw error;
    }
  },

  async addExpense(expense: Expense): Promise<Expense> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding expense:", error);
      throw error;
    }
  },

  async resetExpenses(): Promise<{ message: string; expenses: Expense[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error resetting expenses:", error);
      throw error;
    }
  },
};
