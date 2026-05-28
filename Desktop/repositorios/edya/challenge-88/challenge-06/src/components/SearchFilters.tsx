import { useMemo, type ChangeEvent } from "react"
import type { Filters, Song } from "../interfaces"

interface Props {
  songs: Song[]
  filters: Filters
  hasActiveFilters: boolean
  onGenreChange: (genre: string) => void
  onArtistChange: (artist: string) => void
  onMinPopularityChange: (min: number) => void
  onToggleFavorites: () => void
  onReset: () => void
}

export function SearchFilters({
  songs,
  filters,
  hasActiveFilters,
  onGenreChange,
  onArtistChange,
  onMinPopularityChange,
  onToggleFavorites,
  onReset,
}: Props) {
  const genres = useMemo(
    () => [...new Set(songs.map((s) => s.genre))].sort(),
    [songs]
  )

  const artists = useMemo(
    () => [...new Set(songs.map((s) => s.artist))].sort(),
    [songs]
  )

  return (
    <div className="search-filters">
      <div className="filters-row">
        {/* Genre */}
        <div className="filter-item">
          <label className="filter-label" htmlFor="filter-genre">
            Género
          </label>
          <select
            id="filter-genre"
            className="filter-select"
            value={filters.genre}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onGenreChange(e.target.value)}
          >
            <option value="">Todos</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Artist */}
        <div className="filter-item">
          <label className="filter-label" htmlFor="filter-artist">
            Artista
          </label>
          <select
            id="filter-artist"
            className="filter-select"
            value={filters.artist}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onArtistChange(e.target.value)}
          >
            <option value="">Todos</option>
            {artists.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Min Popularity */}
        <div className="filter-item">
          <label className="filter-label" htmlFor="filter-pop">
            Popularidad mínima
          </label>
          <input
            id="filter-pop"
            type="number"
            className="filter-select filter-number"
            placeholder="1 – 100"
            min={1}
            max={100}
            value={filters.minPopularity === 0 ? "" : filters.minPopularity}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const raw = e.target.value
              if (raw === "") {
                onMinPopularityChange(0)
                return
              }
              const val = Number(raw)
              if (!isNaN(val)) onMinPopularityChange(val)
            }}
          />
          
        </div>

        {/* Only Favorites */}
        <div className="filter-item">
          <label className="filter-label">Favoritos</label>
          <button
            className={`filter-toggle ${filters.onlyFavorites ? "active" : ""}`}
            onClick={onToggleFavorites}
            type="button"
          >
            <span>{filters.onlyFavorites ? "❤️" : "🤍"}</span>
            <span>{filters.onlyFavorites ? "Solo favoritos" : "Todos"}</span>
          </button>
        </div>
      </div>

      {hasActiveFilters && (
        <button className="filters-reset" onClick={onReset} type="button">
          Limpiar filtros ✕
        </button>
      )}
    </div>
  )
}
