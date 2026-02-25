import { describe, it, expect } from 'vitest';
import { topKFrequent } from './solution';

describe('Top K Frequent Elements', () => {
  it('should return the k most frequent elements', () => {
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual(
      expect.arrayContaining([1, 2]),
    );
  });

  it('should return single element when k is 1', () => {
    expect(topKFrequent([1], 1)).toEqual([1]);
  });

  it('should handle k equal to number of unique elements', () => {
    expect(topKFrequent([1, 2, 3], 3)).toEqual(
      expect.arrayContaining([1, 2, 3]),
    );
  });

  it('should handle negative numbers', () => {
    expect(topKFrequent([-1, -1, 2, 2, 2], 2)).toEqual(
      expect.arrayContaining([2, -1]),
    );
  });

  it('should return exactly k elements', () => {
    // 1 appears 3x, 2 appears 2x, 3 appears 1x — clear top-2 cutoff
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toHaveLength(2);
  });
});
