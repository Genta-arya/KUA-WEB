import React from "react";
import { Toaster } from "sonner";
import { formatDate } from "../../../../../lib/Utils/Utils";

const TableData = ({ permohonanData, handleStatusChange }) => {
  return (
    <div className="overflow-x-auto max-w-[95%] w-full  mt-8">
      <table className="text-sm divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              NIK
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kontak
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Alamat
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jenis Kelamin
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Berkas
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Surat Cerai
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Disetujui
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jam Akad
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal Akad
            </th>
            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status Bayar
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-center">
          {permohonanData.map((item) => {
            const statusBayar =
              item.payments.length > 0
                ? item.payments[0].status_bayar
                : "Belum Bayar";
            const isSettlement = statusBayar === "settlement";
            return (
              <tr key={item.id}>
                <td className="px-3 py-2 whitespace-nowrap">{item.nik}</td>
                <td className="px-3 py-2 whitespace-nowrap">{item.noHp}</td>
                <td className="px-3 py-2 whitespace-nowrap">{item.alamat}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {item.j_kelamin === "male" ? "Laki-laki" : "Perempuan"}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {item.status_cerai === "belum"
                    ? "Belum Menikah"
                    : "Pernah Cerai"}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <a
                    href={item.berkas}
                    download="berkas"
                    className="hover:underline hover:opacity-80"
                  >
                    Lihat
                  </a>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {item.berkas_cerai === null ? (
                    "Belum Ada"
                  ) : (
                    <a
                      href={item.berkas_cerai}
                      download="berkas"
                      className="hover:underline hover:opacity-80"
                    >
                      Lihat
                    </a>
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <select
                    value={item.status_berkas}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value, item.userId)
                    }
                    className="bg-white border border-gray-300 rounded p-1"
                    disabled={isSettlement || item.status_berkas === "ditolak"}
                  >
                    <option value="pending">Pending</option>
                    <option value="setuju">Setuju</option>
                    <option value="ditolak">Ditolak</option>
                  </select>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{item.jam_akad}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {formatDate(item.tanggal_akad)}
                </td>
                <td
                  className={`px-3 py-2 whitespace-nowrap font-bold ${
                    statusBayar === "settlement"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {statusBayar === "settlement" ? "Lunas" : statusBayar}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default TableData;
