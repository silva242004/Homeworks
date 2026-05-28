import { Link } from "react-router-dom"
import { useSongsContext } from "../context/SongsContext"
import { SongCard } from "../components/SongCard"

export default function Home() {
  const { topSongs, songs } = useSongsContext()

  return (
    <div className="page home-page">
      <header className="page-header">
        <h1>Bienvenido a ECUALIZER</h1>
        <p>Explora, descubre y disfruta de tu música favorita</p>
      
        <section className="home-actions">
        <Link to="/search" className="action-btn">
          
          <span>Buscar</span>
        </Link>
        <Link to="/recommendations" className="action-btn">
          
          <span>Recomendaciones</span>
        </Link>
        <Link to="/favorites" className="action-btn">
          
          <span>Favoritos</span>
        </Link>
        <Link to="/rankings" className="action-btn">
          
          <span>Rankings</span>
        </Link>
      
      </section>
      </header>

      <section className="home-stats">
        <div className="stat-card">
          <span className="stat-number">{songs.length}</span>
          <span className="stat-label">Canciones</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{topSongs[0]?.popularity ?? 0}</span>
          <span className="stat-label">Popularidad máxima</span>
        </div>
        
      </section>

      <section className="home-top">
        <div className="section-header">
          <h2>Top 5 canciones</h2>
         
        </div>
        <div className="cards-grid">
          {topSongs.slice(0, 5).map((song, index) => (
            <SongCard key={song.id} song={song} rank={index + 1} />
          ))}
        </div>
      </section>

      
    </div>
  )
}
