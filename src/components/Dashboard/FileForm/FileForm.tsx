import React, { useState } from "react";
import { TreeNode } from "../FileTree/utils/fileTreeInterface";
import { useDispatch } from "react-redux";
import { addFolderRequest } from "@/store/reducers/folderSlice";
import { removeForm } from "@/store/reducers/menuFormSlice";

const FileForm = (props:{initialFormData:TreeNode}) => {
  const {initialFormData} = props;
  const dispatch = useDispatch();
  const [depth, setDepth] = useState(0);
  const [name, setName] = useState('');

  const handleOnSubmit = (e:any)=>{
    e.preventDefault();
    const treeNodeData:TreeNode = {
      ...initialFormData,
      name,
      depth: initialFormData.depth || depth,
    }
    dispatch(addFolderRequest(treeNodeData));
    dispatch(removeForm());
  }
  return (
    <div className="p-4 bg-white rounded shadow">
      <form onSubmit={handleOnSubmit}>
        <div>
          <label>Menu ID</label>
          <input
            type="text"
            name="id"
            value={initialFormData?.id || ""}
            className="w-full p-2 border rounded bg-gray-100"
            disabled
          />
        </div>
        <div>
          <label>Depth</label>
          <input type="text" value={initialFormData.depth || ""} onChange={(e)=>{setDepth(parseInt(e.target.value))}} className="w-full p-2 border rounded" disabled/>
        </div>
        <div>
          <label>Parent Data</label>
          <input type="text" value={initialFormData?.parentData || ""} className="w-full p-2 border" disabled/>
        </div>
        <div>
          <label>Name</label>
          <input type="text"  onChange={(e)=>{setName(e.target.value)}}  className="w-full p-2 border" />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default FileForm;