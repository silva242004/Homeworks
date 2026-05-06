export type GraphNode = {
  id: string;
  type: "person" | "city";
  name: string;
  age?: number;
};

export type Edge = {
  source: string;
  target: string;
};

export class Graph {
  nodes: GraphNode[] = [];
  adjacencyList: Record<string, string[]> = {};

  addNode(node: GraphNode): void {
    if (!this.nodes.find((n) => n.id === node.id)) {
      this.nodes.push(node);
    }
    if (!this.adjacencyList[node.id]) {
      this.adjacencyList[node.id] = [];
    }
  }

  addEdge(sourceId: string, targetId: string): void {
    if (!this.adjacencyList[sourceId]) {
      this.adjacencyList[sourceId] = [];
    }
    if (!this.adjacencyList[sourceId].includes(targetId)) {
      this.adjacencyList[sourceId].push(targetId);
    }
  }

  getPeopleByCity(cityId: string): GraphNode[] {
    return this.nodes.filter(
      (node) =>
        node.type === "person" &&
        this.adjacencyList[node.id]?.includes(cityId)
    );
  }

  print(): void {
    console.log("Graph nodes:", this.nodes);
    console.log("Adjacency list:", this.adjacencyList);
  }
}
