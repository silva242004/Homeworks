import { TreeNode } from "../models/TreeNode";

export class NaryTree {
  root: TreeNode | null;

  constructor(root: TreeNode | null = null) {
    this.root = root;
  }

  insert(parentId: string, newNode: TreeNode): boolean {
    const parent = this.findNode(this.root, parentId);

    if (!parent) return false;

    parent.addChild(newNode);
    return true;
  }

  findNode(node: TreeNode | null, id: string): TreeNode | null {
    if (!node) return null;

    if (node.id === id) return node;

    for (const child of node.children) {
      const found = this.findNode(child, id);
      if (found) return found;
    }

    return null;
  }
}
