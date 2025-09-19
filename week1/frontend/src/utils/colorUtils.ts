import type { Expense } from "../types/Expense";

export type SortOption =
  | "date-newest"
  | "date-oldest"
  | "amount-highest"
  | "amount-lowest";

/**
 * Generates a consistent color index for a given payer name
 * Using a simple hash function to ensure the same payer always gets the same color
 */
export function getPayerColorIndex(payerName: string): number {
  let hash = 0;
  for (let i = 0; i < payerName.length; i++) {
    const char = payerName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Return a positive number between 0-10 for our color classes
  return Math.abs(hash) % 11;
}

/**
 * Gets the CSS class name for a payer's color
 */
export function getPayerColorClass(payerName: string): string {
  const colorIndex = getPayerColorIndex(payerName);
  return `payer-color-${colorIndex}`;
}

/**
 * Gets the CSS class name for an expense item's border color
 */
export function getBorderColorClass(payerName: string): string {
  const colorIndex = getPayerColorIndex(payerName);
  return `border-color-${colorIndex}`;
}

/**
 * Sorts expenses based on the given sort option
 */
export function sortExpenses(
  expenses: Expense[],
  sortOption: SortOption
): Expense[] {
  const sorted = [...expenses];

  switch (sortOption) {
    case "date-newest":
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    case "date-oldest":
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    case "amount-highest":
      return sorted.sort((a, b) => b.amount - a.amount);

    case "amount-lowest":
      return sorted.sort((a, b) => a.amount - b.amount);

    default:
      return sorted;
  }
}
