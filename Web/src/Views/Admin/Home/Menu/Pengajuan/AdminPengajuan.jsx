import React, { useEffect, useState } from "react";
import {
  HandleChangeStatusPermohonan,
  HandleGetPermohonan,
} from "../../../../../Service/API/Permohonan/PermohonanService";
import TableData from "./TableData";
import LoadingGlobal from "../../../../../components/LoadingGlobal";
import { io } from "socket.io-client";
import { toast, Toaster } from "sonner";

const AdminPengajuan = ({ userId, role }) => {
  const [permohonanData, setPermohonanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [keterangan, setKeterangan] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await HandleGetPermohonan({ userId, role });
      setPermohonanData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const socketIo = io("http://localhost:5001", {});
    if (userId || role) {
      fetchData();
    }
    if (userId || role) {
      socketIo.on("paymentStatusUpdated", (data) => {
        if (data.refresh) {
          fetchData();
        }
      });
    }
  }, [userId, role]);

  const handleStatusChange = async (id, newStatus, uid) => {
    const socketIo = io("http://localhost:5001", {
      query: { userId: uid },
    });
    if (newStatus === "ditolak") {
      setSelectedItem(id);
      setIsModalOpen(true);
      return;
    }

    setPermohonanData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status_berkas: newStatus } : item
      )
    );

    try {
      await HandleChangeStatusPermohonan({
        id,
        status: newStatus,
        userId: uid,
      });
      socketIo.emit("getNotif", { userId: uid, refresh: true });
      socketIo.emit("refresh", { userId: uid, refresh: true });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitKeterangan = async () => {
    setLoading(true);
    if (!selectedItem || !keterangan) return;

    const socketIo = io("http://localhost:5001", {
      query: { userId },
    });

    try {
      await HandleChangeStatusPermohonan({
        id: selectedItem,
        status: "ditolak",
        userId,
        keterangan,
      });
      toast.success("Status Diperbarui");
      socketIo.emit("getNotif", { userId, refresh: true });
      fetchData();
      setIsModalOpen(false);
      setKeterangan("");
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingGlobal />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <TableData
        handleStatusChange={handleStatusChange}
        permohonanData={permohonanData}
      />
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Keterangan ditolak</h2>
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="w-full border border-gray-300 p-2 mb-4 rounded"
              rows="4"
              placeholder="Masukkan keterangan..."
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSubmitKeterangan}
                className="bg-hijau-tua text-white px-4 py-2 rounded hover:opacity-90"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-opacity-80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default AdminPengajuan;
