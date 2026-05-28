import { useSongsContext } from "../context/SongsContext"
import { RankingItem } from "../components/RankingItem"

export default function Rankings() {
  const { topSongs } = useSongsContext()

  return (
    <div className="page rankings-page">
      <header className="page-header">
        <h1>Ranking de popularidad</h1>
        <p>las canciones más populares del momento.</p>
      </header>

      {topSongs.length === 0 ? (
        <p className="empty-hint">No hay canciones disponibles.</p>
      ) : (
        <ol className="ranking-list">
          {topSongs.map((song, index) => (
            <RankingItem key={song.id} song={song} position={index + 1} />
          ))}
        </ol>
      )}
    </div>
  )
}
