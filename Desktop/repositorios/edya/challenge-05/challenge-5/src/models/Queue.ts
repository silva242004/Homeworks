import { Node } from "./Node"


export class Queue<T> {
  private head: Node<T> | null
  private tail: Node<T> | null
  private length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  enqueue(value: T): void {
    const newNode = new Node(value)

    if (!this.tail) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }

    this.length++
  }

  dequeue(): T | null {
    if (!this.head) return null

    const removed = this.head
    this.head = this.head.next

    if (!this.head) {
      this.tail = null
    }

    this.length--
    return removed.value
  }

  peek(): T | null {
    return this.head ? this.head.value : null
  }

  size(): number {
    return this.length
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  print(): T[] {
    const result: T[] = []
    let current = this.head

    while (current) {
      result.push(current.value)
      current = current.next
    }

    return result
  }
}