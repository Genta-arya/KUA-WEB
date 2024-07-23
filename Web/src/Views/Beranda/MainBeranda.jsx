import React from "react";
import Navbar from "../../components/Navbar";
import Username from "../../components/Username";
import Menu from "./components/Menu";
import ModalProfil from "../../components/Modal/ModalProfil";


const MainBeranda = () => {
  return (
    <main>
      <ModalProfil />
      <Navbar />
      <div className=" max-w-md md:max-w-3xl mx-auto">
        <Username />
        <Menu />
      
      </div>
    </main>
  );
};

export default MainBeranda;
