/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
export function topKFrequent(nums, k) {
  let mapFrequency = {};

  for (let i = 0; i < nums.length; i++) {
    let currentNumber = nums[i];
    mapFrequency[currentNumber] = mapFrequency[currentNumber]
      ? 1
      : mapFrequency[currentNumber];
  }
}
