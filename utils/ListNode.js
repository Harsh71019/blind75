export class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  // Helper to create a list from an array
  static fromArray(arr) {
    if (!arr.length) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  }

  // Helper to convert list to array for testing
  toArray() {
    const arr = [];
    let current = this;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    return arr;
  }
}
