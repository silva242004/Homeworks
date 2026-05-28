import { useState, useCallback } from "react"
import { defaultFilters } from "../interfaces"
import type { Filters } from "../interfaces"

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const setGenre = useCallback((genre: string) => {
    setFilters((prev) => ({ ...prev, genre }))
  }, [])

  const setArtist = useCallback((artist: string) => {
    setFilters((prev) => ({ ...prev, artist }))
  }, [])

  const setMinPopularity = useCallback((minPopularity: number) => {
    setFilters((prev) => ({ ...prev, minPopularity }))
  }, [])

  const toggleFavorites = useCallback(() => {
    setFilters((prev) => ({ ...prev, onlyFavorites: !prev.onlyFavorites }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  const hasActiveFilters =
    filters.genre !== "" ||
    filters.artist !== "" ||
    filters.minPopularity > 0 ||
    filters.onlyFavorites

  return {
    filters,
    setGenre,
    setArtist,
    setMinPopularity,
    toggleFavorites,
    resetFilters,
    hasActiveFilters,
  }
}
