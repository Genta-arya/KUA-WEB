import React from "react";
import ListRiwayat from "./components/ListRiwayat";
import Header from "../../components/Header";
import useCheckLogin from "./../../lib/Hooks/useCheckLogin";
import BottomNavigasi from "../../components/BottomNavigasi";
import LoadingGlobal from "../../components/LoadingGlobal";

const MainRiwayat = () => {
  const { id_user, role , isLoading , username  } = useCheckLogin();

  if (isLoading) return <LoadingGlobal />;
  return (
    <div>
      <Header title={"Riwayat Pengajuan"} slug={"/beranda"} />
      <div className="max-w-[90%] mx-auto pb-8">
        <ListRiwayat userId={id_user} role={role} username={username} />
      </div>
    </div>
  );
};

export default MainRiwayat;
