import React from "react";
import { IoLogOutOutline } from "react-icons/io5";

import icon from "../../../assets/Images/icon.jpeg";
import useSidebarStore from "../../../lib/Zustand/SideBarStore";

const Sidebar = () => {
  const { setCurrentView, currentView } = useSidebarStore();

  const handleLogout = () => {
    // Implement your logout logic here
  };

  return (
    <div className="bg-white text-hijau-tua w-48 min-h-screen border-r">
      <div className="p-4 pt-8">
        <div className="flex justify-center">
          <img src={icon} alt="" className="w-28 rounded-lg" />
        </div>
      </div>
      <nav>
        <ul className="">
          <li>
            <button
              onClick={() => setCurrentView("pengajuan")}
              className={`flex items-center p-4 w-full text-left transition-colors ${
                currentView === "pengajuan" ? "bg-slate-100 font-bold" : "hover:bg-slate-100"
              }`}
            >
              <span className="mr-2">📝</span>
              Pengajuan
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center p-4 w-full text-left hover:bg-slate-100 transition-colors"
            >
              <IoLogOutOutline size={24} className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
