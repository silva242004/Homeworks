import { Node } from "./Node"

export class Stack<T> {
  private top: Node<T> | null
  private length: number

  constructor() {
    this.top = null
    this.length = 0
  }

  push(value: T): void {
    const newNode = new Node(value)

    if (!this.top) {
      this.top = newNode
    } else {
      newNode.next = this.top
      this.top = newNode
    }

    this.length++
  }

  pop(): T | null {
    if (!this.top) return null

    const removed = this.top
    this.top = this.top.next

    this.length--
    return removed.value
  }

  peek(): T | null {
    return this.top ? this.top.value : null
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  size(): number {
    return this.length
  }

  print(): T[] {
    const result: T[] = []
    let current = this.top

    while (current) {
      result.push(current.value)
      current = current.next
    }

    return result
  }
}