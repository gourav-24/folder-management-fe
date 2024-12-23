import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "@/store/store";
import { FiPlus } from "react-icons/fi";
import { TreeNode } from "./utils/fileTreeInterface";
import FileTreeNode from "./FileTreeNode";
import { fetchFoldersRequest } from "@/store/reducers/folderSlice";
import { updateDefaultDataInForm } from "@/store/reducers/menuFormSlice";



const FileTree: React.FC = () => {
  const dispatch = useDispatch();
  const { folders, loading, error } = useSelector((state: RootState) => state.folder);
  
  // fetch folders
  useEffect(()=>{
    dispatch(fetchFoldersRequest(null));
  },[]);
  

  const [expandAll, setExpandAll] = useState(false);
  const [collapseAll, setCollapseAll] = useState(false);

  const handleFolderAddClick = (e:any)=>{
    dispatch(updateDefaultDataInForm({
      id:uuidv4(),
      name:'',
      depth:1,
      parentId:'',
      parentData:'',
  }));
    
  }

  

  const handleExpandAll = () => {
    setExpandAll(true);
    setCollapseAll(false);
  };

  const handleCollapseAll = () => {
    setCollapseAll(true);
    setExpandAll(false);
  };

  return (
    <div className="p-4 border rounded mx-5 mb-5">
      <div className="flex justify-between mb-4   ">
        <button
          onClick={handleExpandAll}
          className="px-10 py-2 bg-black text-white rounded-3xl mx-5"
        >
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          className="px-10 py-2 bg-white text-black rounded-3xl border"
        >
          Collapse All
        </button>
          <button
            onClick={(e) => handleFolderAddClick(e)}
            className="ml-2 p-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 text-base flex items-center justify-center"
          >
            <FiPlus />
          </button>
      </div>
      {folders?.map((nodeRec)=>
          (<FileTreeNode
          key={nodeRec.id}
          node={nodeRec}
          expandAll={expandAll}
          collapseAll={collapseAll}
        />)
      )}
    </div>
  );
};

export default FileTree;

