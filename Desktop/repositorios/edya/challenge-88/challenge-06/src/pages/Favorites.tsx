import { useSongsContext } from "../context/SongsContext"
import { SongCard } from "../components/SongCard"
import { Link } from "react-router-dom"

export default function Favorites() {
  const { favorites } = useSongsContext()

  return (
    <div className="page favorites-page">
      <header className="page-header">
        <h1>Mis favoritos</h1>
        <p>{favorites.length} canciónes guardadas.</p>
      </header>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <p>Aún no tienes canciones favoritas.</p>
          
        </div>
      ) : (
        <div className="cards-grid">
          {favorites.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  )
}
