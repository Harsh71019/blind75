# Best Time to Buy and Sell Stock

**Difficulty:** Easy
**LeetCode:** [Link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

## Problem

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return _the maximum profit you can achieve from this transaction_. If you cannot achieve any profit, return `0`.

## Approaches

### 1. Brute Force

- Check every pair of days $(i, j)$ where $j > i$.
- Calculate profit `prices[j] - prices[i]`.
- Keep track of maximum profit.
- **Time:** O(n^2)
- **Space:** O(1)

### 2. One Pass / Two Pointers (Optimal)

- Iterate through the prices.
- Keep track of the minimum price found so far (`minPrice`).
- Calculate potential profit if sold today: `currentPrice - minPrice`.
- Update the `maxProfit` if the current profit is higher.
- If current price is lower than `minPrice`, update `minPrice`.
- **Time:** O(n)
- **Space:** O(1)

## Code Snippet (One Pass)

```javascript
let maxProfit = 0;
let minPrice = Infinity;

for (let price of prices) {
  if (price < minPrice) {
    minPrice = price; // Found a new lowest price to buy
  } else {
    maxProfit = Math.max(maxProfit, price - minPrice); // Calculate profit
  }
}
return maxProfit;
```
