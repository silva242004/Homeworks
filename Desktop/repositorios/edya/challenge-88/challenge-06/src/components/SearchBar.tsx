import { useSongsContext } from "../context/SongsContext"

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useSongsContext()

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Busca una canción..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus
      />
      {searchQuery.trim() !== "" && (
        <button className="search-clear" onClick={() => setSearchQuery("")}>
          ✕
        </button>
      )}
    </div>
  )
}
