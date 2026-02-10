# Two Sum

**Difficulty:** Easy
**LeetCode:** [Link](https://leetcode.com/problems/two-sum/)

## Problem

Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.

You may assume that each input would have **exactly one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.

## Approaches

### 1. Brute Force

- Check every pair of numbers to see if they sum to the target.
- **Time:** O(n^2)
- **Space:** O(1)

### 2. Hash Map (Optimal)

- Iterate through the array.
- For each element `n`, calculate the `complement` (`target - n`).
- Check if the `complement` exists in the hash map.
- If it does, return the index of the `complement` and the current index.
- If not, add the current element and its index to the hash map.
- **Time:** O(n)
- **Space:** O(n)

## Code Snippet (Hash Map)

```javascript
const prevMap = new Map(); // val -> index

for (let i = 0; i < nums.length; i++) {
  const diff = target - nums[i];
  if (prevMap.has(diff)) {
    return [prevMap.get(diff), i];
  }
  prevMap.set(nums[i], i);
}
```
