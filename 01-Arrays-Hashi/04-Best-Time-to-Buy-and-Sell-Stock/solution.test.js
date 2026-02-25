import { describe, it, expect } from 'vitest';
import { maxProfit } from './solution';

describe('Best Time to Buy and Sell Stock', () => {
  it('should return max profit for standard case', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });

  it('should return 0 when no profit is possible (decreasing prices)', () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });

  it('should handle empty array', () => {
    expect(maxProfit([])).toBe(0);
  });

  it('should handle single element array', () => {
    expect(maxProfit([5])).toBe(0);
  });

  it('should handle prices with 0', () => {
    expect(maxProfit([2, 1, 0, 4])).toBe(4);
  });
});
