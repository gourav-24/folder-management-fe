import React, { useState } from "react";
import { FiPlus, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { FileTreeNodeProps } from "./utils/fileTreeInterface";

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
    node,
    onAddChild,
    expandAll,
    collapseAll,
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newChildName, setNewChildName] = useState("");
    const [isHovered, setIsHovered] = useState(false); // Track hover state for this node only
  
    // Sync state with expandAll/collapseAll props
    React.useEffect(() => {
      if (expandAll) setIsExpanded(true);
      if (collapseAll) setIsExpanded(false);
    }, [expandAll, collapseAll]);
  
    const handleAddChild = (e: React.FormEvent) => {
      e.preventDefault();
      if (newChildName.trim()) {
        onAddChild(node.id, newChildName.trim());
        setNewChildName("");
        setIsFormVisible(false);
      }
    };
  
    return (
      <div
        className="ml-4 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Vertical Line connecting parent to child nodes */}
        {node.children && node.children.length > 0 && (
            <div className="absolute top-0 left-[-12px] w-px h-full bg-gray-300"></div>
        )}

        <div className="flex items-center justify-start relative">

          {/* Expand/Collapse Icon */}
          {node.children && node.children.length > 0 && (
            <div>
                <div className="absolute top-0 left-[-12px] w-px h-full bg-gray-300"></div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mr-2"
                    title={isExpanded ? "Collapse" : "Expand"}
                    >
                    {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                </button>
            </div>
          )}
  
          {/* Node Name */}
          <span className="flex-grow">{node.name}</span>
  
          {/* Add Child Button (Visible only on hover of this node) */}
          {isHovered && (
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="ml-2 p-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 text-base flex items-center justify-center"
            >
              <FiPlus />
            </button>
          )}
            {/* Horizontal Line connecting node */}
            {node.children && node.children.length > 0 && (
            <div className="absolute top-1/2 left-[-12px] h-px w-4 bg-gray-300"></div>
            )}
        </div>
  
        {/* Form for adding child nodes */}
        {isFormVisible && (
          <form onSubmit={handleAddChild} className="mt-2 ml-4">
            <input
              type="text"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder="Enter child name"
              className="border rounded p-1 w-full"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add
            </button>
          </form>
        )}
  
        {/* Immediate Child Nodes */}
        {isExpanded &&
          node.children &&
          node.children.map((child) => (
            <div key={child.id} className="relative">
                {/* Vertical Line for child node */}
                <div className="absolute top-[-12px] left-[-12px] w-px h-4 bg-gray-300"></div>
        
                <FileTreeNode
                key={child.id}
                node={child}
                onAddChild={onAddChild}
                expandAll={expandAll}
                collapseAll={collapseAll}
                />
            </div>
          ))}
      </div>
    );
  };
  

export default FileTreeNode;