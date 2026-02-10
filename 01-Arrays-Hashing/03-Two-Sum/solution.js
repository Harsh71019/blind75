/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export function twoSum(nums, target) {
  const prevMap = new Map(); // val -> index

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (prevMap.has(diff)) {
      return [prevMap.get(diff), i];
    }
    prevMap.set(nums[i], i);
  }
  return [];
}
