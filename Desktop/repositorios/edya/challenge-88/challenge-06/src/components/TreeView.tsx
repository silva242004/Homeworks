import { TreeNode } from "../models/TreeNode";
import TreeNodeItem from "./TreeNodeItem";

const TreeView = ({ node }: { node: TreeNode }) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      <TreeNodeItem node={node} />
      {node.children.map((child) => (
        <TreeView key={child.id} node={child} />
      ))}
    </div>
  );
};

export default TreeView;