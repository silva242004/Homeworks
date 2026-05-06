import { createContext } from "react";
import type { NodeType } from "../models/TreeNode";
import type { NaryTree } from "../structures/NaryTree";
import type { GraphNode, Edge } from "../structures/Graph";
import type { Product } from "../structures/Trie";

export interface TreeContextType {
  // ── Tree ──────────────────────────────────────────────
  tree: NaryTree;
  addNode: (parentId: string, name: string, type: NodeType) => Promise<void>;

  // ── Graph ─────────────────────────────────────────────
  graphNodes: GraphNode[];
  graphEdges: Edge[];
  createCity: (name: string) => Promise<void>;
  createPerson: (name: string, age: number, cityId: string) => Promise<void>;
  connectPersonToCity: (personId: string, cityId: string) => Promise<void>;
  getPeopleByCity: (cityId: string) => GraphNode[];

  // ── Search engine ─────────────────────────────────────
  products: Product[];
  addProduct: (name: string, popularity: number) => Promise<void>;
  searchProducts: (prefix: string, k: number) => Product[];
}

export const TreeContext = createContext<TreeContextType | null>(null);
