export type NodeType = "folder" | "file";

export class TreeNode {
  id: string;
  name: string;
  type: NodeType;
  children: TreeNode[];
  createdBy: string;

  constructor(
    id: string,
    name: string,
    type: NodeType,
    createdBy: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.createdBy = createdBy;
    this.children = [];
  }

  addChild(node: TreeNode) {
    if (this.type === "file") {
      throw new Error("Un archivo no puede tener hijos");
    }
    this.children.push(node);
  }
}