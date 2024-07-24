import React from "react";
import ScheduleList from "./components/ScheduleList";
import Header from "../../components/Header";

const MainSchedule = () => {
  return (
    <div>
        <Header slug={"/beranda"} title={"Daftar Jadwal Nikah"} />
      <div className="mx-auto max-w-[90%] py-4">
        <ScheduleList />
      </div>
    </div>
  );
};

export default MainSchedule;
