import { describe, it, expect } from 'vitest';
import { productExceptSelf } from './solution';

describe('Product of Array Except Self', () => {
  it('should return the product of all elements except self', () => {
    expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
  });

  it('should handle arrays with a single zero', () => {
    expect(productExceptSelf([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0]);
  });

  it('should handle arrays with multiple zeros', () => {
    expect(productExceptSelf([0, 4, 0])).toEqual([0, 0, 0]);
  });

  it('should handle all negative numbers', () => {
    expect(productExceptSelf([-1, -2, -3, -4])).toEqual([-24, -12, -8, -6]);
  });
});
