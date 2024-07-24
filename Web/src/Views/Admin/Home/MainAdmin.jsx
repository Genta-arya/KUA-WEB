import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import AdminPengajuan from "./Menu/Pengajuan/AdminPengajuan"; // Periksa path ke komponen AdminPengajuan
import useSidebarStore from "../../../lib/Zustand/SideBarStore";

import useCheckLoginAdmin from "../../../lib/Hooks/useCheckLoginAdmin";
import LoadingGlobal from "../../../components/LoadingGlobal";

const MainAdmin = () => {
  const { currentView } = useSidebarStore();
  const { role, email, username, id_user , isLoading } = useCheckLoginAdmin();

  const renderView = () => {
    switch (currentView) {
      case "pengajuan":
        return <AdminPengajuan userId={id_user} role={role} />;

      default:
        return <div>Pilih menu di sidebar</div>; // Tampilan default
    }
  };

  if (isLoading) return <LoadingGlobal />;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <Navbar username={username} role={role} />
        <main className="flex-1 p-4 ">{renderView()}</main>
      </div>
    </div>
  );
};

export default MainAdmin;
