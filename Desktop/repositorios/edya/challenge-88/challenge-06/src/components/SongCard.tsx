import { useSongsContext } from "../context/SongsContext"
import type { Song } from "../interfaces"

interface Props {
  song: Song
  rank?: number
}

export function SongCard({ song, rank }: Props) {
  const { addFavorite, removeFavorite, isFavorite } = useSongsContext()
  const favorited = isFavorite(song.id)

  const handleToggle = () => {
    if (favorited) {
      removeFavorite(song.id)
    } else {
      addFavorite(song)
    }
  }

  return (
    <div className="song-card">
      {rank !== undefined && <span className="song-rank">#{rank}</span>}

      <div className="song-info">
        <p className="song-title">{song.title}</p>
        <p className="song-artist">{song.artist}</p>
        <span className="song-genre">{song.genre}</span>
      </div>

      <div className="song-footer">
        <div className="song-popularity">
          <span className="pop-bar" style={{ width: `${song.popularity}%` }} />
          <span className="pop-value">{song.popularity}</span>
        </div>
        <button
          className={`fav-btn ${favorited ? "active" : ""}`}
          onClick={handleToggle}
          title={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {favorited ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  )
}
