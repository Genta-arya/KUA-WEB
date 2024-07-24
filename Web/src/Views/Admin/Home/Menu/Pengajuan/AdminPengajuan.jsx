import React, { useEffect, useState } from "react";
import {
  HandleChangeStatusPermohonan,
  HandleGetPermohonan,
} from "../../../../../Service/API/Permohonan/PermohonanService";
import TableData from "./TableData";
import LoadingGlobal from "../../../../../components/LoadingGlobal";
import { io } from "socket.io-client";

const AdminPengajuan = ({ userId, role }) => {
  const [permohonanData, setPermohonanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [keterangan, setKeterangan] = useState("");

  const fetchData = async () => {
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
    if (userId || role) {
      fetchData();
    }
  }, [userId, role]);

  const handleStatusChange = async (id, newStatus, uid) => {
    if (newStatus === "ditolak") {
      setSelectedItem(id);
      setIsModalOpen(true);
      return;
    }

    const socketIo = io("http://localhost:5001", {
      query: { userId: uid },
    });

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
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitKeterangan = async () => {
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
      socketIo.emit("getNotif", { userId, refresh: true });
      fetchData();
      setIsModalOpen(false);
      setKeterangan("");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <LoadingGlobal />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <TableData
        handleStatusChange={handleStatusChange}
        permohonanData={permohonanData}
      />
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Keterangan ditolak</h2>
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
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPengajuan;
