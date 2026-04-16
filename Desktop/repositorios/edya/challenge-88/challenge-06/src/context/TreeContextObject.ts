import { createContext } from "react";
import type { NodeType } from "../models/TreeNode";
import type { NaryTree } from "../structures/NaryTree";

export interface TreeContextType {
  tree: NaryTree;
  addNode: (parentId: string, name: string, type: NodeType) => Promise<void>;
}

export const TreeContext = createContext<TreeContextType | null>(null);
