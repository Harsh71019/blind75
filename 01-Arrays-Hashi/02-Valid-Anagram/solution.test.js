import { describe, it, expect } from 'vitest';
import { isAnagram } from './solution';

describe('Valid Anagram', () => {
  it('should return true for anagrams', () => {
    expect(isAnagram('anagram', 'nagaram')).toBe(true);
  });

  it('should return false for non-anagrams', () => {
    expect(isAnagram('rat', 'car')).toBe(false);
  });

  it('should return false for different lengths', () => {
    expect(isAnagram('a', 'ab')).toBe(false);
  });
});
