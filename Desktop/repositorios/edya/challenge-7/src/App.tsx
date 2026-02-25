import { useState } from "react";
import SongsPage from "./pages/SongsPage";
import BrowserPage from "./pages/BrowserPage";

function App() {
  const [page, setPage] = useState<"songs" | "browser">("songs");

  return (
    <div>
      <h1>Challenge 07</h1>

      <button onClick={() => setPage("songs")}>
        Songs Page
      </button>

      <button onClick={() => setPage("browser")}>
        Browser Page
      </button>

      <hr />

      {page === "songs" && <SongsPage />}
      {page === "browser" && <BrowserPage />}
    </div>
  );
}

export default App;