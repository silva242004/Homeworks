import { useState } from "react"
import { useSongsContext } from "../context/SongsContext"
import { SongCard } from "../components/SongCard"
import type { Song } from "../interfaces"

export default function Recommendations() {
  const { songs, getRecommendations } = useSongsContext()
  const [selected, setSelected] = useState<Song | null>(null)

  const recommendations = selected ? getRecommendations(selected.id) : []

  return (
    <div className="page recommendations-page">
      <header className="page-header">
        <h1>Recomendaciones</h1>
        <p>Selecciona una canción para ver canciones relacionadas.</p>
      </header>

      <section className="rec-selector">
        <h2>Elige una canción</h2>
        <div className="selector-grid">
          {songs.map((song) => (
            <button
              key={song.id}
              className={`selector-btn ${selected?.id === song.id ? "active" : ""}`}
              onClick={() => setSelected(song)}
            >
              <span className="selector-title">{song.title}</span>
              <span className="selector-artist">{song.artist}</span>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <section className="rec-results">
          <h2>
            Recomendadas para "{selected.title}"
            <span className="rec-count"> — {recommendations.length} canciones</span>
          </h2>

          {recommendations.length === 0 ? (
            <p className="empty-hint">Esta canción no tiene recomendaciones disponibles.</p>
          ) : (
            <div className="cards-grid">
              {recommendations.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
