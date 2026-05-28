import { createContext, useContext } from "react"
import type { SongsContextValue } from "../interfaces"

export const SongsContext = createContext<SongsContextValue | null>(null)

export function useSongsContext(): SongsContextValue {
  const ctx = useContext(SongsContext)
  if (!ctx) throw new Error("useSongsContext must be used inside SongsProvider")
  return ctx
}
