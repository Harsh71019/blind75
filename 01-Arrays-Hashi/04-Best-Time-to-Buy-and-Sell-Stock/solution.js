/**
 * @param {number[]} prices
 * @return {number}
 */
export function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    let currentPrice = prices[i];
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
    } else {
      let profit = currentPrice - minPrice;
      maxProfit = Math.max(profit, maxProfit);
    }
  }
  return maxProfit;
}
