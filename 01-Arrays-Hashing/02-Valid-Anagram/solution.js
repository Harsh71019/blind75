/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
export function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  let seen = {};

  for (let char of s) {
    seen[char] = (seen[char] || 0) + 1;
  }

  for (let char of t) {
    if (!seen[char]) {
      return false;
    }
    seen[char]--;
  }

  return true;
}
