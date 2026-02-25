# Product of Array Except Self

**Difficulty:** Medium
**LeetCode:** [Link](https://leetcode.com/problems/product-of-array-except-self/)

## Problem

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in `O(n)` time and without using the division operation.

## Approaches

### 1. Prefix and Suffix Arrays

- Build a `prefix` array where `prefix[i]` contains the product of all elements to the left of `nums[i]`.
- Build a `suffix` array where `suffix[i]` contains the product of all elements to the right of `nums[i]`.
- Multiply `prefix[i]` and `suffix[i]` for each element.
- **Time:** O(n)
- **Space:** O(n)

### 2. Space Optimized (Prefix and Suffix in Output Array)

- Use the output array `answer` to store the prefix products. Set `answer[0] = 1` and `answer[i] = answer[i - 1] * nums[i - 1]`.
- Maintain a running `postfix` product variable (initially 1) and iterate backwards, multiplying `answer[i]` by `postfix` and then updating `postfix = postfix * nums[i]`.
- **Time:** O(n)
- **Space:** O(1) (excluding the output array space)

## Code Snippet (Space Optimized)

```javascript
/* implementation details */
```
