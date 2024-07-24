import React, { useEffect, useState } from "react";
import {
  HandleChangeStatusPermohonan,
  HandleGetPermohonan,
} from "../../../../../Service/API/Permohonan/PermohonanService";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import TableData from "./TableData";
import LoadingGlobal from "../../../../../components/LoadingGlobal";
import { io } from "socket.io-client";

const AdminPengajuan = ({ userId, role }) => {
  const [permohonanData, setPermohonanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <LoadingGlobal />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <TableData
        handleStatusChange={handleStatusChange}
        permohonanData={permohonanData}
      />
    </div>
  );
};

export default AdminPengajuan;
