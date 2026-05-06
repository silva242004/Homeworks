import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { TreeNode, type NodeType } from "../models/TreeNode";
import { useAuthContext } from "../hooks/useAuthContext";
import { getTree, saveTree } from "../services/treeService";
import { NaryTree } from "../structures/NaryTree";
import { Graph, type GraphNode, type Edge } from "../structures/Graph";
import { Trie, type Product } from "../structures/Trie";
import { MaxHeap } from "../structures/MaxHeap";
import {
  saveNode,
  saveEdge,
  getAllNodes,
  getAllEdges,
} from "../services/graphService";
import {
  saveProduct,
  getAllProducts,
} from "../services/productService";
import { TreeContext } from "./TreeContextObject";

// ── Graph mock data ────────────────────────────────────────
const MOCK_CITIES: GraphNode[] = [
  { id: "city-barranquilla", type: "city", name: "Barranquilla" },
  { id: "city-guajira", type: "city", name: "Guajira" },
  { id: "city-medellin", type: "city", name: "Medellin" },
];

const MOCK_PERSONS: GraphNode[] = [
  { id: "person-yesenia", type: "person", name: "Yesenia", age: 25 },
  { id: "person-kriss", type: "person", name: "Kriss R", age: 30 },
  { id: "person-juan", type: "person", name: "Juan", age: 28 },
  { id: "person-laura", type: "person", name: "Laura", age: 22 },
  { id: "person-maria", type: "person", name: "Maria", age: 27 },
];

const MOCK_EDGES: Edge[] = [
  { source: "person-yesenia", target: "city-barranquilla" },
  { source: "person-kriss", target: "city-guajira" },
  { source: "person-juan", target: "city-medellin" },
  { source: "person-laura", target: "city-medellin" },
  { source: "person-maria", target: "city-medellin" },
];

// ── Product mock data ──────────────────────────────────────
const MOCK_PRODUCTS: Product[] = [
  { name: "air max", popularity: 90 },
  { name: "air force", popularity: 95 },
  { name: "air jordan", popularity: 85 },
  { name: "adidas boost", popularity: 80 },
];

export const TreeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();

  // ── Tree state ────────────────────────────────────────
  const [tree, setTree] = useState<NaryTree>(new NaryTree());

  // ── Graph state ───────────────────────────────────────
  const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
  const [graphEdges, setGraphEdges] = useState<Edge[]>([]);

  // ── Product / Search state ────────────────────────────
  const [products, setProducts] = useState<Product[]>([]);
  const trie = useRef<Trie>(new Trie());

  // Rebuild trie whenever the products list changes
  useEffect(() => {
    const t = new Trie();
    products.forEach((p) => t.insert(p));
    trie.current = t;
  }, [products]);

  // ── Loaders ───────────────────────────────────────────
  const loadTree = useCallback(async () => {
    if (!user) {
      setTree(new NaryTree());
      return;
    }
    const data = await getTree(user.uid);
    if (data) {
      setTree(data);
      return;
    }
    const root = new TreeNode("root", "root", "folder", user.email ?? "unknown");
    const initialTree = new NaryTree(root);
    setTree(initialTree);
    await saveTree(user.uid, initialTree.root);
  }, [user]);

  const loadGraph = useCallback(async () => {
    const [nodes, edges] = await Promise.all([getAllNodes(), getAllEdges()]);
    if (nodes.length === 0) {
      for (const city of MOCK_CITIES) await saveNode(city);
      for (const person of MOCK_PERSONS) await saveNode(person);
      for (const edge of MOCK_EDGES) await saveEdge(edge);
      setGraphNodes([...MOCK_CITIES, ...MOCK_PERSONS]);
      setGraphEdges(MOCK_EDGES);
    } else {
      setGraphNodes(nodes);
      setGraphEdges(edges);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    const loaded = await getAllProducts();
    if (loaded.length === 0) {
      for (const p of MOCK_PRODUCTS) await saveProduct(p);
      setProducts(MOCK_PRODUCTS);
    } else {
      setProducts(loaded);
    }
  }, []);

  useEffect(() => { void loadTree(); }, [loadTree]);
  useEffect(() => { void loadGraph(); }, [loadGraph]);
  useEffect(() => { void loadProducts(); }, [loadProducts]);

  // ── Tree actions ──────────────────────────────────────
  const addNode = async (parentId: string, name: string, type: NodeType) => {
    if (!user) return;
    const newNode = new TreeNode(
      Date.now().toString(),
      name,
      type,
      user.email ?? "unknown"
    );
    const nextTree = new NaryTree(tree.root);
    nextTree.insert(parentId, newNode);
    setTree(nextTree);
    await saveTree(user.uid, nextTree.root);
  };

  // ── Graph actions ─────────────────────────────────────
  const createCity = async (name: string): Promise<void> => {
    const id = `city-${Date.now()}`;
    const node: GraphNode = { id, type: "city", name };
    await saveNode(node);
    setGraphNodes((prev) => [...prev, node]);
  };

  const createPerson = async (
    name: string,
    age: number,
    cityId: string
  ): Promise<void> => {
    const id = `person-${Date.now()}`;
    const node: GraphNode = { id, type: "person", name, age };
    const edge: Edge = { source: id, target: cityId };
    await saveNode(node);
    await saveEdge(edge);
    setGraphNodes((prev) => [...prev, node]);
    setGraphEdges((prev) => [...prev, edge]);
  };

  const connectPersonToCity = async (
    personId: string,
    cityId: string
  ): Promise<void> => {
    const edge: Edge = { source: personId, target: cityId };
    await saveEdge(edge);
    setGraphEdges((prev) => [...prev, edge]);
  };

  const getPeopleByCity = (cityId: string): GraphNode[] => {
    const graph = new Graph();
    graphNodes.forEach((n) => graph.addNode(n));
    graphEdges.forEach((e) => graph.addEdge(e.source, e.target));
    return graph.getPeopleByCity(cityId);
  };

  // ── Search engine actions ─────────────────────────────
  const addProduct = async (name: string, popularity: number): Promise<void> => {
    const product: Product = { name, popularity };
    await saveProduct(product);
    setProducts((prev) => [...prev, product]);
  };

  const searchProducts = (prefix: string, k: number): Product[] => {
    if (k <= 0 || !prefix.trim()) return [];
    const matches = trie.current.searchPrefix(prefix.trim());
    if (matches.length === 0) return [];
    const heap = new MaxHeap();
    matches.forEach((p) => heap.insert(p));
    return heap.getTopK(k);
  };

  return (
    <TreeContext.Provider
      value={{
        tree,
        addNode,
        graphNodes,
        graphEdges,
        createCity,
        createPerson,
        connectPersonToCity,
        getPeopleByCity,
        products,
        addProduct,
        searchProducts,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};
