# Contains Duplicate

**Difficulty:** Easy
**LeetCode:** [Link](https://leetcode.com/problems/contains-duplicate/)

## Problem

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

## Approaches

### 1. Brute Force

- Check every pair of numbers.
- **Time:** O(n^2)
- **Space:** O(1)

### 2. Sorting

- Sort the array and check neighbours.
- **Time:** O(n log n)
- **Space:** O(1) (depending on sort implementation)

### 3. Hash Set (Optimal)

- Iterate through the array, adding elements to a `Set`.
- If an element is already in the `Set`, we found a duplicate.
- **Time:** O(n)
- **Space:** O(n)

## Code Snippet (Set)

```javascript
const seen = new Set();
for (const n of nums) {
  if (seen.has(n)) return true;
  seen.add(n);
}
return false;
```
