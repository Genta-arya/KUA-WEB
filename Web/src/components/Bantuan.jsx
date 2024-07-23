import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Bantuan = () => {
  return (
    <div className="mt-8  h-72">
      <h1 className="lg:text-xl text-sm font-bold mb-5">Bantuan Cepat</h1>
      <div className="border rounded-lg py-4 px-4">
        <h1 className="text-sm font-bold">Hubungi Kami</h1>
        <p className="text-xs w-52 text-gray-500">
          Punya pertanyaan atau bantuan? Silahkan hubungi kami.
        </p>
        <div className="flex justify-center pt-4">
          <button className="bg-hijau-tua w-full rounded-md hover:opacity-90">
            <div className="flex items-center justify-center py-2 gap-2">
              <FaWhatsapp size={20} className="text-white" />
              <span className="text-sm font-bold text-white">Kontak Kami</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bantuan;
