import { useRef, useCallback } from "react"
import { Trie } from "../structures/Trie"
import type { Song } from "../interfaces"

export function useTrie(songs: Song[]) {
  const trieRef = useRef<Trie | null>(null)

  if (trieRef.current === null) {
    const trie = new Trie()
    for (const song of songs) {
      trie.insert(song)
    }
    trieRef.current = trie
  }

  const search = useCallback((title: string): Song | null => {
    if (!trieRef.current || title.trim() === "") return null
    return trieRef.current.search(title)
  }, [])

  const getSuggestions = useCallback((prefix: string): Song[] => {
    if (!trieRef.current || prefix.trim() === "") return []
    return trieRef.current.getSuggestionsByPrefix(prefix)
  }, [])

  const insert = useCallback((song: Song): void => {
    trieRef.current?.insert(song)
  }, [])

  return { search, getSuggestions, insert }
}
