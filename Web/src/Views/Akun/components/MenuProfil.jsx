import React from "react";
import { FaChevronRight, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { HandleLogout } from "../../../Service/API/Authentikasi/AuthService";
import authStore from "../../../lib/Zustand/AuthStore";
import { toast } from "sonner";

const menuItems = [
  { icon: "👤", text: "Profil Saya", slug: "/akun/profil" },
  { icon: "🔒", text: "Ubah Kata Sandi", slug: "/akun/katasandi" },
  { icon: "📜", text: "Riwayat Permohonan", slug: "/riwayat" },
  { icon: "⚙️", text: "Tentang Kami", slug: "/tentang" },
];

const MenuProfil = () => {
  const { logout } = authStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
   await HandleLogout(localStorage.getItem("token"));
      localStorage.clear();
      navigate("/");
      logout();
      toast.success("Logout berhasil");
    } catch (error) {
      if (error.response) {
        toast.error("Logout gagal");
      }
    }
  };
  return (
    <div className="rounded-lg pt-8 text-gray-600 font-bold text-sm">
      <ul>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.slug}
            className="flex items-center justify-between py-4 border-b border-gray-200 hover:opacity-80 cursor-pointer ease-in"
          >
            <div className="flex items-center space-x-2">
              <i className="text-blue-500">{item.icon}</i>
              <span>{item.text}</span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center justify-between py-4 mt-4 cursor-pointer w-full"
        >
          <div className="flex items-center space-x-2">
            <i className=" mr-2 ml-2">
              <FaSignOutAlt />
            </i>
            <span>Keluar</span>
          </div>
          <FaChevronRight className="text-gray-400" />
        </button>
      </ul>
    </div>
  );
};

export default MenuProfil;
