import { describe, it, expect } from 'vitest';
import { twoSum } from './solution';

describe('Two Sum', () => {
  it('should return indices of the two numbers such that they add up to target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it('should handle cases where numbers are not sorted', () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it('should handle duplicate numbers if they form the target', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  it('should return empty array if no solution is found', () => {
    expect(twoSum([1, 2, 3], 7)).toEqual([]);
  });

  it('should handle negative numbers', () => {
    expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
  });
});
