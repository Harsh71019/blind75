# Top K Frequent Elements

**Difficulty:** Medium
**LeetCode:** [Link](https://leetcode.com/problems/top-k-frequent-elements/)

## Problem

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.

## Approaches

### 1. Sort by Frequency

- Build a frequency map.
- Sort the unique keys by their frequency in descending order.
- Return the first `k` keys.
- **Time:** O(n log n)
- **Space:** O(n)

### 2. Min-Heap

- Build a frequency map.
- Maintain a min-heap of size `k`.
- Push each unique element; if heap exceeds size `k`, pop the minimum.
- **Time:** O(n log k)
- **Space:** O(n)

### 3. Bucket Sort (Optimal)

- Build a frequency map.
- Create `n + 1` buckets where index = frequency (max possible frequency is `n`).
- Place each number into its corresponding frequency bucket.
- Iterate buckets from highest to lowest, collecting elements until `k` results are gathered.
- **Time:** O(n)
- **Space:** O(n)

## Code Snippet (Bucket Sort)

```javascript
const count = {};
for (const n of nums) count[n] = (count[n] || 0) + 1;

const buckets = Array.from({ length: nums.length + 1 }, () => []);
for (const [num, freq] of Object.entries(count)) {
  buckets[freq].push(Number(num));
}

const result = [];
for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
  result.push(...buckets[i]);
}
return result;
```
