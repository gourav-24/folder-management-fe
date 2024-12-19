// File: components/FileTree.js
"use client";
import { useState } from "react";
import { FiFolder, FiFileText, FiPlus, FiGrid } from "react-icons/fi";
import FileTree from "./FileTree";
import MenuForm from "./MenuForm";

const MenuTree = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <FiGrid className="mr-2 rounded-full bg-blue-800 text-white text-3xl" />  
        <span className="text-2xl font-bold">Menus</span>
      </div>
      <div>
        <div className="text-gray-500 flex items-center mb-2">
          <FiFolder className="mr-2" />
          <span>/ Menus</span>
        </div>
        <div className="flex justify-evenly flex-wrap">
          <FileTree></FileTree>
          <MenuForm></MenuForm>
        </div>
      </div>
    </div>
  );
};

export default MenuTree;
