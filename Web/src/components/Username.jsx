import React, { useState, useEffect } from "react";
import BottomNavigasi from "./BottomNavigasi";

const Username = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString());
      setTimeout(updateClock, 1000);
    };

    updateClock();

    return () => {
      // Cleanup timeout on unmount
      clearTimeout();
    };
  }, []);

  return (
    <div className="bg-hijau-muda text-black py-5 px-4 md:mt-12 mt-8 rounded-md border-hijau-muda-2 border flex items-center justify-between">
      <div>
        <p className="font-bold md:text-xl text-sm">Selamat Datang</p>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-gray-700 text-xs font-bold">Hai,</p>
          <p className="font-bold text-xs text-hijau-tua">M Gentha Arya Pratama</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <p className="md:text-xl text-sm font-bold text-hijau-tua">{time}</p>
      </div>
      <BottomNavigasi />
    </div>
  );
};

export default Username;
