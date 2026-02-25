export class DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | null;
  previous: DoublyNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

export class DoublyLinkedList<T> {
  head: DoublyNode<T> | null;
  tail: DoublyNode<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: T) {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  size() {
    return this.length;
  }
}