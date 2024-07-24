import React from "react";
import Header from "../../components/Header";
import FormPermohonan from "./components/FormPermohonan";
import Bantuan from "../../components/Bantuan";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import useCheckLogin from "../../lib/Hooks/useCheckLogin";

const MainPermohonan = () => {
  const {jk,nik,nama_lengkap,noHp , id_user } = useCheckLogin()

  return (
    <div>
      <Header title={"Permohonan Nikah"} slug={"/beranda"} />

      <div className="mx-auto max-w-[90%] py-4">
        <div className="bg-hijau-tua p-4 rounded-md mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle size={24} className="text-yellow-400" />
            <h1 className="text-lg font-bold text-white">Perhatian</h1>
          </div>

          <p className="text-xs text-white">
            Kepada pengguna harap mengisikan data dengan valid untuk menghindari
            kesalahan yang tidak diinginkan. <Link to={"/panduan"} className="font-bold text-hijau-muda-2 underline cursor-pointer">Panduan</Link>
          </p>
        </div>
        <FormPermohonan id={id_user} jk={jk} niks={nik} nm_lengkap={nama_lengkap} noHp={noHp} />

        <Bantuan />
      </div>
      <Toaster position="top-right" richColors/>
    </div>
  );
};

export default MainPermohonan;
