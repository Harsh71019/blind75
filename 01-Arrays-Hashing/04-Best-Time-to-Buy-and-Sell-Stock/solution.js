/**
 * @param {number[]} prices
 * @return {number}
 */
export function maxProfit(prices) {
  let maxP = 0;
  let l = 0; // Buy pointer
  let r = 1; // Sell pointer

  while (r < prices.length) {
    if (prices[l] < prices[r]) {
      const profit = prices[r] - prices[l];
      maxP = Math.max(maxP, profit);
    } else {
      l = r; // Found a new low, so shift buy pointer
    }
    r++;
  }
  return maxP;
}
