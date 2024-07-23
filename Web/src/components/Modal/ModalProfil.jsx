import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModalProfil = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal is open by default

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const transition = { duration: 0.3 };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transition}
        >
          <motion.div
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
            variants={modalVariants}
          >
            <h2 className="text-sm font-bold mb-1">Lengkapi Profil</h2>
            <p className="mb-4 text-xs text-gray-500">
              Sebelum menggunakan layanan yang ada di sistem kami, harap
              lengkapi profil Anda.
            </p>
            <form>
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
                  max={12}
                  placeholder="Nomor telepon"
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
                  max={16}
                  placeholder="Nomor Induk Kependudukan"
                  className="w-full border text-sm border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-hijau-tua"
                />
              </div>

              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-hijau-tua w-full text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition-colors"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-hijau-tua w-full text-hijau-tua  px-4 py-2 rounded-md text-sm hover:opacity-90 transition-colors"
                >
                  Tutup
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
