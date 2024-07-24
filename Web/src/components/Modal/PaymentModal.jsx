import React, { useState, useEffect } from "react";
import { formatDate, formatRupiah } from "../../lib/Utils/Utils";
import { toast, Toaster } from "sonner";

const PaymentModal = ({ isOpen, onClose, payment }) => {
  const [countdown, setCountdown] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const calculateCountdown = () => {
      const expiryTime = new Date(payment.expiry_time).getTime();
      const now = new Date().getTime();
      return Math.max(expiryTime - now, 0);
    };

    setCountdown(calculateCountdown());

    const timerId = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1000, 0));
    }, 1000);

    setTimer(timerId);

    return () => clearInterval(timerId);
  }, [isOpen, payment.expiry_time]);

  const handleCopyVA = () => {
    navigator.clipboard.writeText(payment.va_number).then(() => {
      toast.success("VA Number dicopy ke clipboard");
    });
  };

  const handleBayarSekarang = () => {
    window.open(
      "https://simulator.sandbox.midtrans.com/bca/va/index",
      "_blank"
    );
    onClose()
  };

  const formatCountdown = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
  };

  const isExpired = countdown <= 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-[95%]">
        <h2 className="text-lg font-bold mb-4">Detail Pembayaran</h2>
        <div className="mb-4">
          <p className="font-semibold">Keperluan</p>
          <p className="text-xs">Pengajuan Permohonan Pernikahan</p>
        </div>
        <div className="mb-4 flex justify-between">
          <div>
            <p className="font-semibold">BCA Virtual Account</p>
            <p>{payment.va_number}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyVA}
              className="bg-blue-500 text-white px-2 py-1 text-xs rounded-md"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Biaya</p>
          <p>{formatRupiah(Number(payment.biaya.replace(/[^0-9.-]+/g, "")))}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold mt-2 max-w-56">Selesaikan sebelum</p>
          <p>
            {formatDate(new Date(payment.expiry_time), "dd MMMM yyyy HH:mm")}
          </p>

          <p>{formatCountdown(countdown)}</p>
        </div>
        <div className="flex justify-center flex-col gap-2">
          <button
            onClick={handleBayarSekarang}
            disabled={isExpired}
            className={`text-white px-4 py-2 rounded-md text-xs font-bold ${
              isExpired
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-hijau-tua hover:bg-opacity-90"
            }`}
          >
            {isExpired ? "Pembayaran telah dinonaktifkan" : "Bayar Sekarang"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-opacity-90 text-xs font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default PaymentModal;
