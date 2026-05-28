import { useMemo } from "react"
import type { Song, Filters } from "../interfaces"

export function useSongSearch(
  allSongs: Song[],
  trieSuggestions: Song[],
  favorites: Song[],
  searchQuery: string,
  filters: Filters
) {
  const favoriteIds = useMemo(
    () => new Set(favorites.map((f) => f.id)),
    [favorites]
  )

  const results = useMemo(() => {
    // When no text query, apply filters to all songs.
    // When there is a query, start from the Trie suggestions (already prefix-filtered).
    const base = searchQuery.trim() === "" ? allSongs : trieSuggestions

    return base.filter((song) => {
      if (filters.genre && song.genre !== filters.genre) return false
      if (filters.artist && song.artist !== filters.artist) return false
      if (filters.minPopularity > 0 && song.popularity < filters.minPopularity) return false
      if (filters.onlyFavorites && !favoriteIds.has(song.id)) return false
      return true
    })
  }, [allSongs, trieSuggestions, favoriteIds, searchQuery, filters])

  return results
}
