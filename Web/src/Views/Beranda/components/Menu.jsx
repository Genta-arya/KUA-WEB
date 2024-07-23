import React from "react";
import {
  FaRegFileAlt,
  FaCalendarCheck,
  FaListAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Bantuan from "../../../components/Bantuan";

const Menu = () => {
  return (
    <>
      <div className="mb-4">
        <h1 className="lg:text-2xl text-sm pt-8 font-bold">Pilih Layanan</h1>
        <p className="text-gray-400 font-bold text-xs">
          Pilih layanan kami yang sesuai dengan kebutuhan
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mx-auto">
        <Link
          to="/permohonan"
          className="flex flex-col items-center py-4 border rounded shadow-lg hover:shadow-hijau-tua transition-colors ease-in"
        >
          <FaRegFileAlt size={40} className="text-hijau-tua mb-2" />
          <span className="text-xs font-bold text-gray-500">
            Permohonan Nikah
          </span>
        </Link>
        <Link
          to="/jadwal"
          className="flex flex-col items-center py-4 border rounded shadow-lg hover:shadow-hijau-tua transition-colors ease-in"
        >
          <FaCalendarCheck size={40} className="text-hijau-tua mb-2" />
          <span className="text-xs font-bold text-gray-500">Jadwal Nikah</span>
        </Link>
        <Link
          to="#"
          className="flex flex-col items-center py-4 border rounded shadow-lg hover:shadow-hijau-tua transition-colors ease-in"
        >
          <FaListAlt size={40} className="text-hijau-tua mb-2" />
          <span className="text-xs font-bold text-gray-500">Panduan</span>
        </Link>
        <Link
          to="https://maps.app.goo.gl/6TKk9jNRrkfGdZw7A"
          className="flex flex-col items-center py-4 border rounded shadow-lg hover:shadow-hijau-tua transition-colors ease-in"
        >
          <FaMapMarkerAlt size={40} className="text-hijau-tua mb-2" />
          <span className="text-xs font-bold text-gray-500">Lokasi</span>
        </Link>
      </div>
      <Bantuan />
    </>
  );
};

export default Menu;
