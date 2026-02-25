import { describe, it, expect } from 'vitest';
import { containsDuplicate } from './solution';

describe('Contains Duplicate', () => {
  it('should return true if duplicate exists', () => {
    expect(containsDuplicate([1, 2, 3, 1])).toBe(true);
  });

  it('should return false if all elements are distinct', () => {
    expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
  });

  it('should handle multiple duplicates', () => {
    expect(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBe(true);
  });

  it('should handle empty arrays', () => {
    expect(containsDuplicate([])).toBe(false);
  });
});
