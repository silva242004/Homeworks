import type { Product } from "./Trie";

export class MaxHeap {
  private heap: Product[] = [];

  get size(): number {
    return this.heap.length;
  }

  insert(product: Product): void {
    this.heap.push(product);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMax(): Product {
    if (this.heap.length === 0) throw new Error("Heap is empty");
    const max = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return max;
  }

  getTopK(k: number): Product[] {
    const snapshot = new MaxHeap();
    this.heap.forEach((p) => snapshot.insert(p));

    const results: Product[] = [];
    const count = Math.min(k, this.heap.length);
    for (let i = 0; i < count; i++) {
      results.push(snapshot.extractMax());
    }
    return results;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].popularity >= this.heap[index].popularity) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  private sinkDown(index: number): void {
    const n = this.heap.length;
    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let largest = index;
      if (left < n && this.heap[left].popularity > this.heap[largest].popularity) largest = left;
      if (right < n && this.heap[right].popularity > this.heap[largest].popularity) largest = right;
      if (largest === index) break;
      [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
      index = largest;
    }
  }
}
