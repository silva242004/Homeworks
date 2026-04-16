import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { TreeNode, type NodeType } from "../models/TreeNode";
import { NaryTree } from "../structures/NaryTree";

const COLLECTION = "trees";

interface SerializedTreeNode {
  id: string;
  name: string;
  type: NodeType;
  createdBy: string;
  children: SerializedTreeNode[];
}

const serializeNode = (node: TreeNode): SerializedTreeNode => ({
  id: node.id,
  name: node.name,
  type: node.type,
  createdBy: node.createdBy,
  children: node.children.map(serializeNode),
});

const deserializeNode = (node: SerializedTreeNode): TreeNode => {
  const treeNode = new TreeNode(node.id, node.name, node.type, node.createdBy);
  treeNode.children = node.children.map(deserializeNode);
  return treeNode;
};

export const saveTree = async (userId: string, root: TreeNode | null) => {
  await setDoc(doc(db, COLLECTION, userId), {
    tree: root ? serializeNode(root) : null,
  });
};

export const getTree = async (userId: string): Promise<NaryTree | null> => {
  const docRef = doc(db, COLLECTION, userId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.data().tree as
    | SerializedTreeNode
    | { root: SerializedTreeNode | null }
    | null
    | undefined;

  const serializedRoot =
    data && "root" in data
      ? data.root
      : data;

  const root = serializedRoot ? deserializeNode(serializedRoot) : null;

  return new NaryTree(root);
};
