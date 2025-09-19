// filepath: /Users/whyrox/Developer/3BIN-Q1-WEB3/week1/frontend/src/utils/colorUtils.ts
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
