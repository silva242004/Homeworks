export class MaxHeap<T> {
  private heap: T[]
  private compare: (a: T, b: T) => number

  constructor(compare: (a: T, b: T) => number) {
    this.heap = []
    this.compare = compare
  }

  push(item: T): void {
    this.heap.push(item)
    this.percolateUp(this.heap.length - 1)
  }

  pop(): T | null {
    if (this.heap.length === 0) return null
    if (this.heap.length === 1) return this.heap.pop()!

    const top = this.heap[0]
    this.heap[0] = this.heap.pop()!
    this.percolateDown(0)
    return top
  }

  peek(): T | null {
    return this.heap.length > 0 ? this.heap[0] : null
  }

  toArray(): T[] {
    return [...this.heap].sort((a, b) => this.compare(b, a))
  }

  get size(): number {
    return this.heap.length
  }

  private percolateUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2)
      if (this.compare(this.heap[index], this.heap[parent]) > 0) {
        ;[this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]]
        index = parent
      } else {
        break
      }
    }
  }

  private percolateDown(index: number): void {
    const length = this.heap.length

    while (true) {
      const left = 2 * index + 1
      const right = 2 * index + 2
      let largest = index

      if (left < length && this.compare(this.heap[left], this.heap[largest]) > 0) {
        largest = left
      }
      if (right < length && this.compare(this.heap[right], this.heap[largest]) > 0) {
        largest = right
      }

      if (largest !== index) {
        ;[this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]]
        index = largest
      } else {
        break
      }
    }
  }

  static heapify<T>(items: T[], compare: (a: T, b: T) => number): MaxHeap<T> {
    const heap = new MaxHeap<T>(compare)
    for (const item of items) {
      heap.push(item)
    }
    return heap
  }
}
