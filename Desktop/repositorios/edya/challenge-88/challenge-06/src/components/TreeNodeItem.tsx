import { TreeNode } from "../models/TreeNode";

const TreeNodeItem = ({ node }: { node: TreeNode }) => {
  return (
    <div>
      {node.type === "folder" ? "📁" : "📄"} {node.name} 
      <small> ({node.createdBy})</small>
    </div>
  );
};

export default TreeNodeItem;