import React, { useState, useEffect } from 'react';

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
    <div className="bg-hijau-muda text-black py-5 px-4 md:mt-12 rounded-md border-hijau-tua border flex items-center justify-between">
      <div>
        <p className="font-bold text-xl">Selamat Datang</p>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-gray-700">Hai,</p>
          <p className="font-bold">M Gentha Arya Pratama</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <p className="text-xl font-bold text-hijau-tua">{time}</p>
      </div>
    </div>
  );
};

export default Username;
