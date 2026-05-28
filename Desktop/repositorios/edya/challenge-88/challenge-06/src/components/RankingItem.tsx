import { useSongsContext } from "../context/SongsContext"
import type { Song } from "../interfaces"

interface Props {
  song: Song
  position: number
}

const medals: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" }

export function RankingItem({ song, position }: Props) {
  const { addFavorite, removeFavorite, isFavorite } = useSongsContext()
  const favorited = isFavorite(song.id)

  return (
    <li className={`ranking-item ${position <= 3 ? "top-three" : ""}`}>
      <span className="ranking-position">
        {medals[position] ?? <span className="pos-number">{position}</span>}
      </span>

      <div className="ranking-info">
        <p className="ranking-title">{song.title}</p>
        <p className="ranking-artist">{song.artist}</p>
      </div>

      <div className="ranking-right">
        <div className="pop-indicator">
          <div className="pop-fill" style={{ width: `${song.popularity}%` }} />
          <span className="pop-label">{song.popularity}</span>
        </div>
        <button
          className={`fav-btn ${favorited ? "active" : ""}`}
          onClick={() => (favorited ? removeFavorite(song.id) : addFavorite(song))}
        >
          {favorited ? "❤️" : "🤍"}
        </button>
      </div>
    </li>
  )
}
