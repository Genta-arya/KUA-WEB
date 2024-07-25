import React from "react";
import MenuProfil from "./components/MenuProfil";
import Navbar from "../../components/Navbar";
import BottomNavigasi from "../../components/BottomNavigasi";
import Username from "../../components/Username";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainAkun = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-[90%] lg:max-w-[70%] ">
        <div className="hidden md:block lg:block">
          <Link to={"/beranda"}>
            <div className="flex items-center gap-2">
              <FaArrowLeft />
              <p>Kembali</p>
            </div>
          </Link>
        </div>
        <Username />
        <MenuProfil />
        <BottomNavigasi />
      </div>
    </div>
  );
};

export default MainAkun;
