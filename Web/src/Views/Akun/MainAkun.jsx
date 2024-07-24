import React from "react";
import MenuProfil from "./components/MenuProfil";
import Navbar from "../../components/Navbar";
import BottomNavigasi from "../../components/BottomNavigasi";
import Username from "../../components/Username";

const MainAkun = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-[90%] ">
        <Username />
        <MenuProfil />
        <BottomNavigasi />
      </div>
    </div>
  );
};

export default MainAkun;
