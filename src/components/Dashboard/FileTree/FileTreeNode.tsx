import React, { useState, useCallback } from "react";
import { FiPlus, FiChevronRight, FiChevronDown, FiMinus } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { FileTreeNodeProps, TreeNode } from "./utils/fileTreeInterface";
import { useDispatch } from "react-redux";
import { updateDefaultDataInForm } from "@/store/reducers/menuFormSlice";
import { deleteFolderRequest } from "@/store/reducers/folderSlice";

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
    node,
    expandAll,
    collapseAll,
  }) => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // Track hover state for this node only
    const handleFolderDeleteClick = (e:any)=>{
      dispatch(deleteFolderRequest(node?.id));

    }
    const handleFolderAddClick = (e:any)=>{
      dispatch(updateDefaultDataInForm({
        id:uuidv4(),
        name:'',
        depth:node?.depth+1,
        parentId:node?.id,
        parentData:node?.name,
    }));
    }  
  
    // Sync state with expandAll/collapseAll props
    React.useEffect(() => {
      if (expandAll) setIsExpanded(true);
      if (collapseAll) setIsExpanded(false);
    }, [expandAll, collapseAll]);
  
  
    return (
      <div
        className="ml-4 relative"
        onMouseEnter={(e) => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
        }}

      >
        {/* Vertical Line connecting parent to child nodes */}
        {node?.children && node?.children?.length > 0 && (
            <div className="absolute top-0 left-[-12px] w-px h-full bg-gray-300"></div>
        )}

        <div className="flex items-center justify-start relative">

          {/* Expand/Collapse Icon */}
          {node?.children && node?.children?.length > 0 && (
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
          <span className="flex-grow">
            {node?.name}
          </span>
  
          {/* Add Child Button (Visible only on hover of this node) */}
          {isHovered && (
              <div className=" flex">
                <button
                onClick={(e) => handleFolderAddClick(e)}
                className="ml-2 p-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 text-base flex items-center justify-center"
              >
                <FiPlus />
              </button>
              <button
                onClick={(e) => handleFolderDeleteClick(e)}
                className="ml-2 p-1 text-white bg-red-500 rounded-full hover:bg-red-600 text-base flex items-center justify-center"
              >
                <FiMinus />
              </button>
            </div>
          )}
            {/* Horizontal Line connecting node */}
            {node?.children && node?.children?.length > 0 && (
            <div className="absolute top-1/2 left-[-12px] h-px w-4 bg-gray-300"></div>
            )}
        </div>
  
        {/* Immediate Child Nodes */}
        {isExpanded &&
          node?.children &&
          node?.children?.map((child) => (
            <div key={child.id} className="relative">
                {/* Vertical Line for child node */}
                <div className="absolute top-[-12px] left-[-12px] w-px h-4 bg-gray-300"></div>
        
                <FileTreeNode
                key={child.id}
                node={child}
                expandAll={expandAll}
                collapseAll={collapseAll}
                />
            </div>
          ))}
      </div>
    );
  };
  

export default FileTreeNode;