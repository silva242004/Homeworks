import type { Song } from "./Song"

export interface SongsContextValue {
  songs: Song[]
  suggestions: Song[]
  topSongs: Song[]
  favorites: Song[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  getRecommendations: (songId: string) => Song[]
  addFavorite: (song: Song) => void
  removeFavorite: (songId: string) => void
  isFavorite: (songId: string) => boolean
  addSong: (song: Song) => void
  isAddSongOpen: boolean
  openAddSong: () => void
  closeAddSong: () => void
}
