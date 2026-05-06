import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import type { GraphNode, Edge } from "../structures/Graph";

const NODES_COLLECTION = "nodes";
const EDGES_COLLECTION = "edges";

export const saveNode = async (node: GraphNode): Promise<void> => {
  await setDoc(doc(db, NODES_COLLECTION, node.id), node);
};

export const saveEdge = async (edge: Edge): Promise<void> => {
  const id = `${edge.source}__${edge.target}`;
  await setDoc(doc(db, EDGES_COLLECTION, id), edge);
};

export const getAllNodes = async (): Promise<GraphNode[]> => {
  const snapshot = await getDocs(collection(db, NODES_COLLECTION));
  return snapshot.docs.map((d) => d.data() as GraphNode);
};

export const getAllEdges = async (): Promise<Edge[]> => {
  const snapshot = await getDocs(collection(db, EDGES_COLLECTION));
  return snapshot.docs.map((d) => d.data() as Edge);
};
