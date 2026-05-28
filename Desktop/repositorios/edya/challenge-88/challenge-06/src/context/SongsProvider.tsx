import { useState, useMemo, useCallback, type ReactNode } from "react"
import { SongsContext } from "./SongsContext"
import { useSongs } from "../hooks/useSongs"

interface Props {
  children: ReactNode
}

export function SongsProvider({ children }: Props) {
  const [isAddSongOpen, setIsAddSongOpen] = useState(false)

  const songData = useSongs()

  const openAddSong = useCallback(() => setIsAddSongOpen(true), [])
  const closeAddSong = useCallback(() => setIsAddSongOpen(false), [])

  const value = useMemo(
    () => ({
      songs: songData.songs,
      suggestions: songData.suggestions,
      topSongs: songData.topSongs,
      favorites: songData.favorites,
      searchQuery: songData.searchQuery,
      setSearchQuery: songData.setSearchQuery,
      getRecommendations: songData.getRecommendations,
      addFavorite: songData.addFavorite,
      removeFavorite: songData.removeFavorite,
      isFavorite: songData.isFavorite,
      addSong: songData.addSong,
      isAddSongOpen,
      openAddSong,
      closeAddSong,
    }),
    [songData, isAddSongOpen, openAddSong, closeAddSong]
  )

  return <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
}
