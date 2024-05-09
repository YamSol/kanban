import React, { useState } from "react";
import {
  UserGroupIcon,
  ServerIcon,
  CalendarIcon,
  ChartSquareBarIcon,
  CogIcon,
  MenuIcon,
} from "@heroicons/react/outline";

function SideBar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para abrir ou fechar o menu ao passar o mouse sobre ele
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="absolute top-0 left-0 bg-blue-100 h-20 w-10">
      <div className="relative">
        {/* Botão que abre o menu dropdown */}
        <button
          className="flex items-center justify-center text-2xl h-16 bg-red-500 text-white font-bold w-40"
          onClick={handleMenuToggle}
        >
          <MenuIcon className="w-7 h-7 text-white" />
          Menu
        </button>
        {/* Conteúdo do menu dropdown */}
        {isMenuOpen && (
          <ul className="absolute top-full left-0 bg-white text-lg shadow-md border border-gray-200 rounded-md py-2 w-max z-50">
            <li
              className="flex items-center space-x-2 py-1 px-4 cursor-pointer hover:bg-gray-100"
              onClick={handleMenuToggle}
            >
              <UserGroupIcon className="w-7 h-7 text-gray-500" />
              <span>Administrador</span>
            </li>
            <li
              className="flex items-center space-x-2 py-1 px-4 cursor-pointer hover:bg-gray-100"
              onClick={handleMenuToggle}
            >
              <ServerIcon className="w-7 h-7 text-gray-500" />
              <span>Tabelas</span>
            </li>
            <li
              className="flex items-center space-x-2 py-1 px-4 cursor-pointer hover:bg-gray-100"
              onClick={handleMenuToggle}
            >
              <CalendarIcon className="w-7 h-7 text-gray-500" />
              <span>Agendar</span>
            </li>
            <li
              className="flex items-center space-x-2 py-1 px-4 cursor-pointer hover:bg-gray-100"
              onClick={handleMenuToggle}
            >
              <ChartSquareBarIcon className="w-7 h-7 text-gray-500" />
              <span>Relatório</span>
            </li>
            <li
              className="flex items-center space-x-2 py-1 px-4 cursor-pointer hover:bg-gray-100"
              onClick={handleMenuToggle}
            >
              <CogIcon className="w-7 h-7 text-gray-500" />
              <span>Configurações</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SideBar;
