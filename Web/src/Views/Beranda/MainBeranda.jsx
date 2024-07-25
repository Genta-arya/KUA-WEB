import React from "react";
import Navbar from "../../components/Navbar";
import Username from "../../components/Username";
import Menu from "./components/Menu";
import ModalProfil from "../../components/Modal/ModalProfil";
import useCheckLogin from "../../lib/Hooks/useCheckLogin";
import LoadingGlobal from "../../components/LoadingGlobal";

const MainBeranda = () => {
  const { id_user, isLoading } = useCheckLogin();

  if (isLoading) return <LoadingGlobal />;
  return (
    <main>
      <ModalProfil />
      <Navbar userId={id_user} />
      <div className=" max-w-[90%] md:max-w-3xl mx-auto lg:max-w-[70%]">
        <Username />
        <Menu />
      </div>
    </main>
  );
};

export default MainBeranda;
