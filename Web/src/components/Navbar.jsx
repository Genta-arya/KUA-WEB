import React from "react";
import { FaBell, FaUser } from "react-icons/fa"; // Icon notifikasi dan profil
import { AiOutlineMenu } from "react-icons/ai"; // Icon menu (opsional)
import icon from "../assets/Images/icon.jpeg";
import profil from "../assets/Images/dummy.jpeg";
const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800  p-4 ">
      {/* Kiri: Icon Menu atau Logo */}
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <div className="flex items-center space-x-4">
          <img src={icon} alt="Logo" className="w-8 h-8 rounded-full" />
        </div>

        {/* Kanan: Profil dan Notifikasi */}
        <div className="flex items-center space-x-4">
          <button className="text-hijau-tua dark:text-gray-300 relative">
            <FaBell size={24} />

            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>
          <button className="text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <img src={profil} alt="Profile" className="w-8 h-8 rounded-full" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
