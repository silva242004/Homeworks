export interface Filters {
  genre: string
  artist: string
  minPopularity: number
  onlyFavorites: boolean
}

export const defaultFilters: Filters = {
  genre: "",
  artist: "",
  minPopularity: 0,
  onlyFavorites: false,
}
