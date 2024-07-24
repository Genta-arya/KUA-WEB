import React, { useEffect, useState } from "react";
import { HandleGetPermohonan } from "../../../Service/API/Permohonan/PermohonanService";
import useLoading from "../../../lib/Zustand/LoadingStore";
import { formatDate, formatRupiah } from "../../../lib/Utils/Utils";
import LoadingGlobal from "../../../components/LoadingGlobal";
import PaymentModal from "../../../components/Modal/PaymentModal";
import { HandlePayment } from "../../../Service/API/Payment/PaymentService";

const ListRiwayat = ({ userId, role }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null); // State untuk data pembayaran
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk visibilitas modal

  const fetchData = async () => {
    try {
      const response = await HandleGetPermohonan({ userId, role });
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId || role) {
      fetchData();
    }
  }, [userId, role]);

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPayment(null);
    setIsModalOpen(false);
  };

  const refreshPaymentStatus = async (order_id) => {
    setLoading(true);
    try {
      const response = await HandlePayment(order_id);

      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingGlobal />;

  return (
    <div className="mt-4">
      <ul>
        {data.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 mb-2 rounded-lg shadow-md border-l-8 border-hijau-tua"
          >
            <div className="w-full">
              <div className="border-b w-full">
                <h1 className="text-sm font-bold max-w-52">
                  Pengajuan Berkas Permohonan Nikah
                </h1>
              </div>
              <div className="">
                <h1 className="font-bold mt-4 text-xs">Jadwal Akad</h1>
                <p className="font-semibold text-xs">{item.jam_akad}</p>
                <p className="text-xs font-bold text-gray-600">
                  {formatDate(item.tanggal_akad)}
                </p>
              </div>
              <div className="flex justify-end">
                <h1
                  className={`font-bold text-xs ${
                    item.status_berkas === "pending"
                      ? "text-orange-500"
                      : item.status_berkas === "ditolak"
                      ? "text-red-500"
                      : item.status_berkas === "setuju"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {item.status_berkas === "pending"
                    ? "Sedang ditinjau"
                    : item.status_berkas === "ditolak"
                    ? "Ditolak"
                    : item.status_berkas === "setuju"
                    ? "Diterima"
                    : ""}
                </h1>
              </div>
              <div>
                <div>
                  {item.payments[0]?.biaya
                    ? formatRupiah(
                        Number(
                          item.payments[0]?.biaya.replace(/[^0-9.-]+/g, "")
                        )
                      )
                    : ""}
                </div>
                {item.payments[0]?.status_bayar === "pending" && (
                  <>
                    <div className="flex justify-center gap-2 mt-4">
                      <button
                        onClick={() => openModal(item.payments[0])}
                        className=" bg-hijau-tua text-white px-2 py-1 text-xs rounded-md w-full hover:bg-opacity-90"
                      >
                        Bayar Sekarang
                      </button>

                      <button
                        onClick={() =>
                          refreshPaymentStatus(item.payments[0]?.order_id)
                        }
                        className=" bg-yellow-500 text-white px-2 py-1 text-xs rounded-md w-full hover:bg-opacity-90"
                      >
                        Cek Status
                      </button>
                    </div>
                  </>
                )}

                {item.payments[0]?.status_bayar === "settlement" && item.status_berkas === "setuju" && (
                  <>
                    <div className="flex justify-center mt-4 bg-hijau-tua text-white rounded-md text-sm font-bold py-1">
                      <p>Pembayaran Lunas</p>
                    </div>

                    <div className="flex justify-between mt-2 gap-2">
                      <button className="w-full bg text-xs border border-hijau-tua py-1 rounded-md">
                        Cetak Bukti Bayar
                      </button>
                      <button className="w-full text-xs border-hijau-tua py-1 rounded-md border">
                        Cetak Permohonan
                      </button>
                    </div>
                  </>
                )}

                {item.payments[0]?.status_bayar === "cancel" && (
                  <>
                    <div className="flex justify-center mt-4 bg-gray-500 text-white rounded-md text-sm font-bold py-1">
                      <p>Transaksi dibatalkan</p>
                    </div>
                  </>
                )}
                {item.payments[0]?.status_bayar === "expire" && (
                  <>
                    <p>test</p>
                  </>
                )}
                {item.payments[0]?.status_bayar === "failure" && (
                  <>
                    <p>test</p>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedPayment && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          payment={selectedPayment}
        />
      )}
    </div>
  );
};

export default ListRiwayat;
