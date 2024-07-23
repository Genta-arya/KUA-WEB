import React from 'react';
import { FaHome, FaSearch, FaUser, FaHistory } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const BottomNavigasi = () => {
  const { pathname } = useLocation();

  const getIconColor = (path) => (pathname === path ? 'text-hijau-tua font-bold' : 'text-gray-500');

  return (
    <div className="md:hidden lg:hidden border-t fixed bottom-0 left-0 right-0 bg-white shadow-md py-4  flex justify-around items-center">
      <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
        <FaHome size={30} className={getIconColor('/beranda')} />
        <span className={`text-xs ${getIconColor('/beranda')}`}>Beranda</span>
      </div>
     
      <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
        <FaHistory size={30} className={getIconColor('/history')} />
        <span className={`text-xs ${getIconColor('/history')}`}>History</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
        <FaUser size={30} className={getIconColor('/profile')} />
        <span className={`text-xs ${getIconColor('/profile')}`}>Akun</span>
      </div>
    </div>
  );
}

export default BottomNavigasi;
