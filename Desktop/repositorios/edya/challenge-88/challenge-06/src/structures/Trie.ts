export type Product = {
  name: string;
  popularity: number;
};

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  products: Product[] = [];
}

export class Trie {
  private root: TrieNode = new TrieNode();

  insert(product: Product): void {
    let node = this.root;
    for (const char of product.name.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.products.push(product);
  }

  searchPrefix(prefix: string): Product[] {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }
    return this.collect(node);
  }

  private collect(node: TrieNode): Product[] {
    const results: Product[] = [...node.products];
    for (const child of node.children.values()) {
      results.push(...this.collect(child));
    }
    return results;
  }
}
