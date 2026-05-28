import { useRef, useCallback } from "react"
import { MaxHeap } from "../structures/MaxHeap"
import type { Song } from "../interfaces"

const byPopularity = (a: Song, b: Song) => a.popularity - b.popularity

export function useHeap(initialSongs: Song[]) {
  const heapRef = useRef<MaxHeap<Song> | null>(null)

  if (heapRef.current === null) {
    heapRef.current = MaxHeap.heapify(initialSongs, byPopularity)
  }

  const pushToHeap = useCallback((song: Song): void => {
    heapRef.current?.push(song)
  }, [])

  const getTopSongs = useCallback((limit: number = 10): Song[] => {
    if (!heapRef.current) return []
    return heapRef.current.toArray().slice(0, limit)
  }, [])

  const peek = useCallback((): Song | null => {
    return heapRef.current?.peek() ?? null
  }, [])

  return { getTopSongs, peek, pushToHeap }
}
