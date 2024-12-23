"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { FiFolder, FiFileText, FiPlus, FiGrid } from "react-icons/fi";
import FileTree from "../FileTree/FileTree";
import MenuForm from "../FileForm/FileForm";
import SearchInput from "../SearchBar/searchBar";



const MenuTree = () => {
  //@ts-ignore
  const {menuForm, expanded} = useSelector((state: RootState)=> state.menuFormData);

  return (
    <div className="p-4">
      <div className="text-gray-500 flex items-center mb-2">
          <FiFolder className="mr-2" />
          <span>/ Menus</span>
      </div>
      <div className="flex items-center mb-6">
        <FiGrid className="mr-2 rounded-full bg-blue-800 text-white text-3xl" />  
        <span className="text-2xl font-bold">Menus</span>
      </div>
      <SearchInput></SearchInput>
      <div>
        <div className="flex justify-evenly flex-wrap">
          <FileTree></FileTree>
          {expanded && (<MenuForm initialFormData={menuForm}></MenuForm>)}
        </div>
      </div>
    </div>
  );
};

export default MenuTree;
