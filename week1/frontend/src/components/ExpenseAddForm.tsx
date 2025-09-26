import React, { useState } from "react";
import type { Expense } from "../types/Expense";

interface ExpenseAddFormProps {
  handleAdd: (expense: Expense) => Promise<void>;
}

const ExpenseAddForm: React.FC<ExpenseAddFormProps> = ({ handleAdd }) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [payer, setPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdding) return;

    setIsAdding(true);
    try {
      const newExpense: Expense = {
        id: Date.now().toString(),
        date,
        description,
        payer,
        amount: parseFloat(amount),
      };
      await handleAdd(newExpense);
      setDate("");
      setDescription("");
      setPayer("");
      setAmount("");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form className="expense-add-form" onSubmit={onSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Payer"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" disabled={isAdding}>
        {isAdding ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseAddForm;
