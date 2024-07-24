import React from "react";

const Navbar = ({ username, role }) => {
  console.log(username);
  return (
    <nav className="bg-white text-black border-b pt-3 pb-2 px-5">
      <div className="flex items-center justify-between  mx-auto">
        {username && role && (
          <div>
            <h1 className="text-xl font-bold text-hijau-tua">Welcome</h1>
            <p className="text-gray-500 font-bold">{username}</p>
            <p className="text-sm">{role === "admin" ? "Administrasi" : ""}</p>
          </div>
        )}

        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-hijau-tua">
            System Administrasi
          </h1>
          <p className="font-bold text-sm text-hijau-tua">KUA Benua Kayong</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
