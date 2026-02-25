/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export function twoSum(nums, target) {
  let obj = {};

  for (let i = 0; i < nums.length; i++) {
    let currentValue = nums[i];
    if (obj[currentValue] !== undefined) {
      return [obj[currentValue], i];
    } else {
      let numberToFind = target - currentValue;
      obj[numberToFind] = i;
    }
  }
  return [];
}
