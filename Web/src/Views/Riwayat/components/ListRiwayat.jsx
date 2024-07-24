import React, { useEffect, useState } from "react";
import { HandleGetPermohonan } from "../../../Service/API/Permohonan/PermohonanService";
import useLoading from "../../../lib/Zustand/LoadingStore";
import { formatDate } from "../../../lib/Utils/Utils";
import Loading from "../../../components/Loading";
import LoadingGlobal from "../../../components/LoadingGlobal";

const ListRiwayat = ({ userId, role }) => {
  const [data, setData] = useState([]);
 const [loading,setLoading] = useState(true)

  const fetchData = async () => {

    
   
    try {
      const response = await HandleGetPermohonan({ userId, role });
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    setLoading(false)
    }
  };

  useEffect(() => {
    if (userId || role) {
      fetchData();
    }
  }, [userId, role]);

  if (loading) return <LoadingGlobal />

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
                      : item.status_berkas === "diterima"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {item.status_berkas === "pending"
                    ? "Sedang ditinjau"
                    : item.status_berkas === "ditolak"
                    ? "Ditolak"
                    : item.status_berkas === "diterima"
                    ? "Diterima"
                    : ""}
                </h1>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRiwayat;
