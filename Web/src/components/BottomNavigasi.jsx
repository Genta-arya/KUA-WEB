import React from "react";
import { FaHome, FaSearch, FaUser, FaHistory } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const BottomNavigasi = () => {
  const { pathname } = useLocation();

  const getIconColor = (path) =>
    pathname === path ? "text-hijau-tua font-bold" : "text-gray-500";

  return (
    <div className="md:hidden lg:hidden border-t fixed bottom-0 left-0 right-0 bg-white shadow-md py-4  flex justify-around items-center">
      <Link to="/beranda" className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
        <FaHome size={20} className={getIconColor("/beranda")} />
        <span className={`text-xs ${getIconColor("/beranda")}`}>Beranda</span>
      </Link>

      <Link to="/riwayat" className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
        <FaHistory size={20} className={getIconColor("/riwayat")} />
        <span className={`text-xs ${getIconColor("/riwayat")}`}>Riwayat</span>
      </Link>
      <Link
        to="/akun"
        className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80"
      >
        <FaUser size={20} className={getIconColor("/akun")} />
        <span className={`text-xs ${getIconColor("/akun")}`}>Akun</span>
      </Link>
    </div>
  );
};

export default BottomNavigasi;
