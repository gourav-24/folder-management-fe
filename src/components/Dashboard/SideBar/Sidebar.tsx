"use client";
import React from "react";
import "../../../styles/sidebarCustomStyles.css";
import { FiMenu, FiFolder, FiGrid } from "react-icons/fi";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white w-64 h-5/6 hidden md:flex flex-col rounded-3xl mx-5 mt-5 ">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <span className="text-xl font-bold">CLOIT</span>
        <FiMenu size={24} className="cursor-pointer" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        {/* Systems */}
        <div className="px-4 mb-2">
          <div className="flex items-center text-gray-400 mb-2">
            <FiFolder className="mr-2" />
            <span>Systems</span>
          </div>
          <div className="ml-6">
            <div className="hover-sidebar-element-effect sidebar-elements">
              <FiGrid className="mr-2" />
              <span>System Code</span>
            </div>
            <div className="hover-sidebar-element-effect sidebar-elements">
              <FiGrid className="mr-2" />
              <span>Properties</span>
            </div>
            <div className="hover-sidebar-element-effect sidebar-elements">
              <FiGrid className="mr-2" />
              <span>Menus</span>
            </div>
            <div className="hover-sidebar-element-effect sidebar-elements">
              <FiGrid className="mr-2" />
              <span>API List</span>
            </div>
          </div>
        </div>

        {/* Users & Group */}
        <div className="px-4 mb-2">
          <div className="flex items-center text-gray-400 mb-2">
            <FiFolder className="mr-2" />
            <span>Users & Group</span>
          </div>
        </div>

        {/* Competition */}
        <div className="px-4">
          <div className="flex items-center text-gray-400">
            <FiFolder className="mr-2" />
            <span>Competition</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;