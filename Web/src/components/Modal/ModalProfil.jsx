import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import authStore from "../../lib/Zustand/AuthStore";
import { HandleUpdateProfil } from "../../Service/API/Profil/ProfilService";

const ModalProfil = () => {
  const { username, id, isModal, setModal } = authStore();

 

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [nik, setNik] = useState("");

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const transition = { duration: 0.3 };

  useEffect(() => {
    if (!isModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await HandleUpdateProfil({
        idUser: id,
        nama_lengkap: name,
        j_kelamin: gender,
        noHp: phone,
        nik,
      });

      window.location.reload();
    } catch (error) {
      // Handle error
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <AnimatePresence>
      {!isModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transition}
        >
          <motion.div
            className="bg-white p-6 rounded shadow-lg max-w-[95%] w-full"
            variants={modalVariants}
          >
            <h2 className="text-base font-bold mb-1">Lengkapi Profil</h2>
            <p className="mb-4 text-xs text-gray-500">
              Sebelum menggunakan layanan yang ada di sistem kami, wajib untuk
              lengkapi profil dibawah ini.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  readOnly
                  value={username}
                  required
                  placeholder="Username"
                  className="w-full border text-sm border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-hijau-tua"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="name"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nama lengkap"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border text-sm border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-hijau-tua"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="gender"
                >
                  Jenis Kelamin
                </label>
                <select
                  id="gender"
                  value={gender}
                  required
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-hijau-tua"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="phone"
                >
                  No HP
                </label>
                <input
                  type="tel"
                  id="phone"
                  maxLength={12}
                  required
                  placeholder="Nomor telepon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-hijau-tua"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="nik"
                >
                  NIK
                </label>
                <input
                  type="text"
                  id="nik"
                  required
                  maxLength={16}
                  placeholder="Nomor Induk Kependudukan"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full border text-sm border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-hijau-tua"
                />
              </div>

              <div className="flex flex-col gap-1">
                <button
                  type="submit"
                  className="bg-hijau-tua w-full text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition-colors"
                >
                  Simpan
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalProfil;
