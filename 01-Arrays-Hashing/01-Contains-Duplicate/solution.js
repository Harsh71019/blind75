/**
 * @param {number[]} nums
 * @return {boolean}
 */
export function containsDuplicate(nums) {
  // Using Set
  // if (nums.length === 0) return false;
  // const unique = new Set(nums);
  // return unique.size !== nums.length;

  let seen = {};
  for (let i = 0; i < nums.length; i++) {
    let number = nums[i];
    if (seen[number]) {
      return true;
    }
    seen[number] = true;
  }
  return false;
}
