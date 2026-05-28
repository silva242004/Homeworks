import type { Song } from "../interfaces"

export class SongGraph {
  private nodes: Map<string, Song>
  private adjacencyList: Map<string, Set<string>>

  constructor() {
    this.nodes = new Map()
    this.adjacencyList = new Map()
  }

  addNode(song: Song): void {
    if (this.nodes.has(song.id)) return
    this.nodes.set(song.id, song)
    this.adjacencyList.set(song.id, new Set())
  }

  addEdge(idA: string, idB: string): void {
    if (!this.nodes.has(idA) || !this.nodes.has(idB)) return
    this.adjacencyList.get(idA)!.add(idB)
    this.adjacencyList.get(idB)!.add(idA)
  }

  getNeighbors(songId: string): Song[] {
    const neighbors = this.adjacencyList.get(songId)
    if (!neighbors) return []

    const result: Song[] = []
    for (const id of neighbors) {
      const song = this.nodes.get(id)
      if (song) result.push(song)
    }
    return result
  }

  getRecommendations(songId: string): Song[] {
    const directNeighbors = this.adjacencyList.get(songId)
    if (!directNeighbors) return []

    const seen = new Set<string>([songId])
    const recommendations: Song[] = []

    for (const neighborId of directNeighbors) {
      seen.add(neighborId)
    }

    for (const neighborId of directNeighbors) {
      const secondLevel = this.adjacencyList.get(neighborId)
      if (!secondLevel) continue

      for (const candidateId of secondLevel) {
        if (!seen.has(candidateId)) {
          seen.add(candidateId)
          const song = this.nodes.get(candidateId)
          if (song) recommendations.push(song)
        }
      }
    }

    if (recommendations.length === 0) {
      for (const neighborId of directNeighbors) {
        const song = this.nodes.get(neighborId)
        if (song) recommendations.push(song)
      }
    }

    return recommendations
  }

  hasNode(songId: string): boolean {
    return this.nodes.has(songId)
  }
}
