import React from "react";
import Navbar from "../../components/Navbar";
import Username from "../../components/Username";


const MainBeranda = () => {
  return (
    <main>
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <Username />
      
      </div>
    </main>
  );
};

export default MainBeranda;
