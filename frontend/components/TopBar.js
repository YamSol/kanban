import React from "react";
import { SearchIcon, AtSymbolIcon, BellIcon } from "@heroicons/react/outline";

function TopBar(props) {
  return (
    <div
      className="h-16 pl-40 flex bg-gradient-to-r from-red-500
        to-red-300 w-full flex items-center justify-between pr-5"
    >
      <div className="flex px-5 items-center">
        <SearchIcon className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Procurar tarefas ..."
          className=" bg-transparent border-0 text-white placeholder-gray-200
                outline-none focus:ring-0 text-lg"
        />
      </div>
      <div className="flex space-x-6">
        <AtSymbolIcon className="w-7 h-7 text-white" />
        <BellIcon className="w-7 h-7 text-white" />
        <div className="flex items-center text-white">
          <h3 className="font-bold mr-3">John Doe</h3>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
