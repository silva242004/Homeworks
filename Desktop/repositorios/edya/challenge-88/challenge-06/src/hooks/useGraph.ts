import { useRef, useCallback } from "react"
import { SongGraph } from "../structures/SongGraph"
import type { Song } from "../interfaces"

export function useGraph(initialSongs: Song[]) {
  const graphRef = useRef<SongGraph | null>(null)

  if (graphRef.current === null) {
    const graph = new SongGraph()

    for (const song of initialSongs) {
      graph.addNode(song)
    }
    for (const song of initialSongs) {
      for (const relatedId of song.relatedIds) {
        graph.addEdge(song.id, relatedId)
      }
    }

    graphRef.current = graph
  }

  const addSongToGraph = useCallback((song: Song): void => {
    const graph = graphRef.current
    if (!graph) return

    graph.addNode(song)
    for (const relatedId of song.relatedIds) {
      graph.addEdge(song.id, relatedId)
    }
  }, [])

  const getNeighbors = useCallback((songId: string): Song[] => {
    return graphRef.current?.getNeighbors(songId) ?? []
  }, [])

  const getRecommendations = useCallback((songId: string): Song[] => {
    return graphRef.current?.getRecommendations(songId) ?? []
  }, [])

  return { getNeighbors, getRecommendations, addSongToGraph }
}
