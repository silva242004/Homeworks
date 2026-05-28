import { useState, useMemo, useCallback } from "react"
import { songs as initialSongs } from "../data/songs"
import { useTrie } from "./useTrie"
import { useHeap } from "./useHeap"
import { useGraph } from "./useGraph"
import { useFavorites } from "./useFavorites"
import type { Song } from "../interfaces"

export function useSongs() {
  // songs is React state — drives re-renders when a song is added
  const [songs, setSongs] = useState<Song[]>(initialSongs)
  const [searchQuery, setSearchQuery] = useState("")

  // Each hook initializes its structure ONCE from the static list via useRef.
  // Dynamic additions go through the exposed imperative methods.
  const { getSuggestions, search, insert: insertToTrie } = useTrie(initialSongs)
  const { getTopSongs, pushToHeap } = useHeap(initialSongs)
  const { getRecommendations, addSongToGraph } = useGraph(initialSongs)
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  // Synchronizes all three structures when a new song is created
  const addSong = useCallback(
    (song: Song): void => {
      insertToTrie(song)
      pushToHeap(song)
      addSongToGraph(song)
      setSongs((prev) => [...prev, song])
    },
    [insertToTrie, pushToHeap, addSongToGraph]
  )

  // songs in deps: when a new song is added (songs state changes),
  // topSongs re-derives from the heap (which already has the new song pushed)
  const topSongs = useMemo(() => getTopSongs(10), [songs, getTopSongs])

  // songs in deps: ensures suggestions update right after a song is added
  const suggestions = useMemo(() => {
    if (searchQuery.trim() === "") return []
    const exact = search(searchQuery)
    const prefix = getSuggestions(searchQuery)
    if (exact) {
      const alreadyIncluded = prefix.some((s) => s.id === exact.id)
      return alreadyIncluded ? prefix : [exact, ...prefix.filter((s) => s.id !== exact.id)]
    }
    return prefix
  }, [searchQuery, songs, getSuggestions, search])

  const handleGetRecommendations = useCallback(
    (songId: string) => getRecommendations(songId),
    [getRecommendations]
  )

  return {
    songs,
    suggestions,
    topSongs,
    favorites,
    searchQuery,
    setSearchQuery,
    getRecommendations: handleGetRecommendations,
    addFavorite,
    removeFavorite,
    isFavorite,
    addSong,
  }
}
