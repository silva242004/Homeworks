import { useCallback, useEffect, useState, type ReactNode } from "react";
import { TreeNode, type NodeType } from "../models/TreeNode";
import { useAuthContext } from "../hooks/useAuthContext";
import { getTree, saveTree } from "../services/treeService";
import { NaryTree } from "../structures/NaryTree";
import { TreeContext } from "./TreeContextObject";

export const TreeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const [tree, setTree] = useState<NaryTree>(new NaryTree());

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

  useEffect(() => {
    void loadTree();
  }, [loadTree]);

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

  return (
    <TreeContext.Provider value={{ tree, addNode }}>
      {children}
    </TreeContext.Provider>
  );
};
