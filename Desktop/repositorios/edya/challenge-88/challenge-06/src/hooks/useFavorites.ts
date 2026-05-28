import { useState, useCallback } from "react"
import type { Song } from "../interfaces"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Song[]>([])

  const addFavorite = useCallback((song: Song) => {
    setFavorites((prev) => {
      if (prev.some((s) => s.id === song.id)) return prev
      return [...prev, song]
    })
  }, [])

  const removeFavorite = useCallback((songId: string) => {
    setFavorites((prev) => prev.filter((s) => s.id !== songId))
  }, [])

  const isFavorite = useCallback(
    (songId: string): boolean => {
      return favorites.some((s) => s.id === songId)
    },
    [favorites]
  )

  return { favorites, addFavorite, removeFavorite, isFavorite }
}
