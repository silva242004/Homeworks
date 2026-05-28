import { useSongsContext } from "../context/SongsContext"
import { useFilters } from "../hooks/useFilters"
import { useSongSearch } from "../hooks/useSongSearch"
import { SearchBar } from "../components/SearchBar"
import { SearchFilters } from "../components/SearchFilters"
import { SongCard } from "../components/SongCard"

export default function Search() {
  const { songs, suggestions, favorites, searchQuery } = useSongsContext()

  const {
    filters,
    setGenre,
    setArtist,
    setMinPopularity,
    toggleFavorites,
    resetFilters,
    hasActiveFilters,
  } = useFilters()

  const results = useSongSearch(songs, suggestions, favorites, searchQuery, filters)

  const isIdle = searchQuery.trim() === "" && !hasActiveFilters

  return (
    <div className="page search-page">
      <header className="page-header">
        <h1>Buscar canciones</h1>
        
      </header>

      <SearchBar />

      <SearchFilters
        songs={songs}
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onGenreChange={setGenre}
        onArtistChange={setArtist}
        onMinPopularityChange={setMinPopularity}
        onToggleFavorites={toggleFavorites}
        onReset={resetFilters}
      />

      <section className="search-results">
        {isIdle && (
          <p className="search-feedback">
            Escribe para buscar por título, o usa los filtros para explorar el catálogo.
          </p>
        )}

        {!isIdle && results.length === 0 && (
          <p className="search-feedback">
            Sin resultados
            {searchQuery.trim() !== "" && (
              <>
                {" "}para <strong>"{searchQuery}"</strong>
              </>
            )}
            {hasActiveFilters && " con los filtros aplicados"}.
          </p>
        )}

        {results.length > 0 && (
          <>
            <p className="results-count">
              {results.length} resultado{results.length !== 1 ? "s" : ""}
              {searchQuery.trim() !== "" && (
                <> para <strong>"{searchQuery}"</strong></>
              )}
              {hasActiveFilters && " (filtros activos)"}
            </p>
            <div className="cards-grid">
              {results.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
