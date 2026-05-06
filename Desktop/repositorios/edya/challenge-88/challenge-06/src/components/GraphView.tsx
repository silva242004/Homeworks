import { Graph as D3Graph } from "react-d3-graph";
import type { GraphNode, Edge } from "../structures/Graph";

interface GraphViewProps {
  nodes: GraphNode[];
  edges: Edge[];
  filterCityId: string | null;
}

interface D3Node {
  id: string;
  label: string;
  color: string;
  size: number;
}

interface D3Link {
  source: string;
  target: string;
}

const graphConfig = {
  directed: true,
  nodeHighlightBehavior: true,
  width: 700,
  height: 420,
  node: {
    labelProperty: "label",
    fontSize: 12,
    highlightFontSize: 14,
    highlightStrokeColor: "#5548e0",
    strokeWidth: 0,
  },
  link: {
    highlightColor: "#6c63ff",
    renderLabel: false,
  },
};

const GraphView = ({ nodes, edges, filterCityId }: GraphViewProps) => {
  if (nodes.length === 0) {
    return <p className="graph-empty">No hay nodos en el grafo.</p>;
  }

  let visibleNodes: GraphNode[];
  let visibleEdges: Edge[];

  if (filterCityId) {
    const connectedEdges = edges.filter((e) => e.target === filterCityId);
    const connectedPersonIds = new Set(connectedEdges.map((e) => e.source));

    visibleNodes = nodes.filter(
      (n) => n.id === filterCityId || connectedPersonIds.has(n.id)
    );
    visibleEdges = connectedEdges;
  } else {
    visibleNodes = nodes;
    visibleEdges = edges;
  }

  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));

  const d3Nodes: D3Node[] = visibleNodes.map((n) => ({
    id: n.id,
    label: n.age !== undefined ? `${n.name} (${n.age}a)` : n.name,
    color: n.type === "city" ? "#f6ad55" : "#68d391",
    size: n.type === "city" ? 600 : 350,
  }));

  const d3Links: D3Link[] = visibleEdges
    .filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target))
    .map((e) => ({ source: e.source, target: e.target }));

  const data = { nodes: d3Nodes, links: d3Links };

  return (
    <div className="graph-visualization">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <D3Graph<D3Node, D3Link>
        id="graph-d3"
        data={data}
        config={graphConfig as any}
      />
    </div>
  );
};

export default GraphView;
