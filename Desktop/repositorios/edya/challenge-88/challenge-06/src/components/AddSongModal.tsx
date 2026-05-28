import { useState, type FormEvent, type ChangeEvent } from "react"
import { useSongsContext } from "../context/SongsContext"
import type { Song } from "../interfaces"

const GENRES = [
  "Pop",
  "Hip-Hop",
  "R&B",
  "Rock",
  "Indie",
  "Electronic",
  "Latin",
  "Soul",
  "Trap",
  "Afrobeats",
  "Synth Pop",
  "Alternative",
]

interface FormErrors {
  title?: string
  artist?: string
  genre?: string
}

export function AddSongModal() {
  const { songs, addSong, closeAddSong } = useSongsContext()

  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [genre, setGenre] = useState("")
  const [popularity, setPopularity] = useState(50)
  const [relatedIds, setRelatedIds] = useState<string[]>([])
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): FormErrors => {
    const errs: FormErrors = {}

    if (!title.trim()) {
      errs.title = "El título es obligatorio."
    } else if (songs.some((s) => s.title.toLowerCase() === title.trim().toLowerCase())) {
      errs.title = "Ya existe una canción con ese título."
    }

    if (!artist.trim()) {
      errs.artist = "El artista es obligatorio."
    }

    if (!genre) {
      errs.genre = "Selecciona un género."
    }

    return errs
  }

  const handleRelatedToggle = (id: string) => {
    setRelatedIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const newSong: Song = {
      id: crypto.randomUUID(),
      title: title.trim(),
      artist: artist.trim(),
      genre,
      popularity,
      relatedIds,
    }

    addSong(newSong)
    closeAddSong()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeAddSong()
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Agregar canción">
        <div className="modal-header">
          <h2>Nueva canción</h2>
          <button className="modal-close" onClick={closeAddSong} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="song-title">
              Título
            </label>
            <input
              id="song-title"
              type="text"
              className={`form-input ${errors.title ? "error" : ""}`}
              placeholder="Nombre de la canción"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value)
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }))
              }}
              autoFocus
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          {/* Artist */}
          <div className="form-group">
            <label className="form-label" htmlFor="song-artist">
              Artista
            </label>
            <input
              id="song-artist"
              type="text"
              className={`form-input ${errors.artist ? "error" : ""}`}
              placeholder="Nombre del artista"
              value={artist}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setArtist(e.target.value)
                if (errors.artist) setErrors((prev) => ({ ...prev, artist: undefined }))
              }}
            />
            {errors.artist && <span className="form-error">{errors.artist}</span>}
          </div>

          {/* Genre */}
          <div className="form-group">
            <label className="form-label" htmlFor="song-genre">
              Género
            </label>
            <select
              id="song-genre"
              className={`form-input form-select ${errors.genre ? "error" : ""}`}
              value={genre}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setGenre(e.target.value)
                if (errors.genre) setErrors((prev) => ({ ...prev, genre: undefined }))
              }}
            >
              <option value="">Seleccionar género...</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.genre && <span className="form-error">{errors.genre}</span>}
          </div>

          {/* Popularity */}
          <div className="form-group">
            <label className="form-label" htmlFor="song-popularity">
              Popularidad
            </label>
            <input
              id="song-popularity"
              type="number"
              className="form-input filter-number"
              placeholder="1 – 100"
              min={1}
              max={100}
              value={popularity === 0 ? "" : popularity}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const raw = e.target.value
                if (raw === "") { setPopularity(0); return }
                const val = Number(raw)
                if (!isNaN(val)) setPopularity(val)
              }}
            />
            <span className="filter-hint">Valor entre 1 y 100</span>
          </div>

          {/* Related Songs */}
          <div className="form-group">
            <label className="form-label">
              Canciones relacionadas
              <span className="related-count">{relatedIds.length} seleccionada(s)</span>
            </label>
            <div className="related-list">
              {songs.map((song) => (
                <label key={song.id} className="related-item">
                  <input
                    type="checkbox"
                    checked={relatedIds.includes(song.id)}
                    onChange={() => handleRelatedToggle(song.id)}
                  />
                  <span className="related-title">{song.title}</span>
                  <span className="related-artist">{song.artist}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={closeAddSong}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Agregar canción
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
