import React, { useState } from "react";
import { TreeNode } from "./utils/fileTreeInterface";
import FileTreeNode from "./FileTreeNode";

const FileTree: React.FC = () => {
  const [tree, setTree] = useState<TreeNode>({
    id: "root",
    name: "Root",
    children: [],
  });
  const [expandAll, setExpandAll] = useState(false);
  const [collapseAll, setCollapseAll] = useState(false);

  const handleAddChild = (parentId: string, childName: string) => {
    const addChild = (node: TreeNode): TreeNode => {
      if (node.id === parentId) {
        const newChild = { id: `${parentId}-${Date.now()}`, name: childName, children: [] };
        return { ...node, children: [...(node.children || []), newChild] };
      }
      if (node.children) {
        return { ...node, children: node.children.map(addChild) };
      }
      return node;
    };

    setTree((prevTree) => addChild(prevTree));
  };

  const handleExpandAll = () => {
    setExpandAll(true);
    setCollapseAll(false);
  };

  const handleCollapseAll = () => {
    setCollapseAll(true);
    setExpandAll(false);
  };

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleExpandAll}
          className="px-10 py-2 bg-black text-white rounded-3xl"
        >
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          className="px-10 py-2 bg-white text-black rounded-3xl border"
        >
          Collapse All
        </button>
      </div>
      <FileTreeNode
        node={tree}
        onAddChild={handleAddChild}
        expandAll={expandAll}
        collapseAll={collapseAll}
      />
    </div>
  );
};

export default FileTree;
