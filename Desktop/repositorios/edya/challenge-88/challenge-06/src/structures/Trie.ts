import type { Song } from "../interfaces"

class TrieNode {
  children: Map<string, TrieNode>
  isEndOfWord: boolean
  song: Song | null

  constructor() {
    this.children = new Map()
    this.isEndOfWord = false
    this.song = null
  }
}

export class Trie {
  private root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert(song: Song): void {
    const key = song.title.toLowerCase().trim()
    let current = this.root

    for (const char of key) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode())
      }
      current = current.children.get(char)!
    }

    current.isEndOfWord = true
    current.song = song
  }

  search(title: string): Song | null {
    const key = title.toLowerCase().trim()
    let current = this.root

    for (const char of key) {
      if (!current.children.has(char)) return null
      current = current.children.get(char)!
    }

    return current.isEndOfWord ? current.song : null
  }

  getSuggestionsByPrefix(prefix: string): Song[] {
    const key = prefix.toLowerCase().trim()
    let current = this.root

    for (const char of key) {
      if (!current.children.has(char)) return []
      current = current.children.get(char)!
    }

    const results: Song[] = []
    this.collectWords(current, results)
    return results
  }

  private collectWords(node: TrieNode, results: Song[]): void {
    if (node.isEndOfWord && node.song !== null) {
      results.push(node.song)
    }

    for (const child of node.children.values()) {
      this.collectWords(child, results)
    }
  }
}
