import { BrowserRouter } from "react-router-dom"
import { SongsProvider } from "./context/SongsProvider"
import { Sidebar } from "./components/Sidebar"
import { AddSongModal } from "./components/AddSongModal"
import { AppRouter } from "./router/AppRouter"
import { useSongsContext } from "./context/SongsContext"
import "./styles/main.scss"

function AppShell() {
  const { isAddSongOpen } = useSongsContext()

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content">
        <AppRouter />
      </main>
      {isAddSongOpen && <AddSongModal />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SongsProvider>
        <AppShell />
      </SongsProvider>
    </BrowserRouter>
  )
}
