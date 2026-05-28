import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Search from "../pages/Search"
import Rankings from "../pages/Rankings"
import Recommendations from "../pages/Recommendations"
import Favorites from "../pages/Favorites"
import NotFound from "../pages/NotFound"

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/rankings" element={<Rankings />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
