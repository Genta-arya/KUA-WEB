import React from "react";

const TableData = ({ permohonanData, handleStatusChange }) => {
  return (
    <table className="min-w-full text-sm divide-y divide-gray-200 border border-gray-300 t">
      <thead className="bg-gray-50">
        <tr className="">
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nama
          </th>
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            NIK
          </th>
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            Telp
          </th>
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            Jenis Kelamin
          </th>
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            Berkas
          </th>
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            Surat Cerai
          </th>
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            Disetujui
          </th>
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            Jam Akad
          </th>
          <th className="px-3 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tanggal Akad
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 text-center">
        {permohonanData.map((item) => (
          <tr key={item.id}>
            <td className="px-3 py-2 whitespace-nowrap">{item.nama_lengkap}</td>
            <td className="px-3 py-2 whitespace-nowrap">{item.nik}</td>
            <td className="px-3 py-2 whitespace-nowrap">{item.noHp}</td>
            <td className="px-3 py-2 whitespace-nowrap">
              {item.j_kelamin === "male" ? "Laki-laki" : "Perempuan"}
            </td>
            <td className="px-3 py-2 whitespace-nowrap">
              {item.status_cerai === "belum" ? "Belum Menikah" : "Pernah Cerai"}
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
                <a href={item.berkas_cerai} download="berkas">
                  Lihat Berkas
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
              >
                <option value="pending">
                  {item.status_berkas === "pending" ||
                  item.status_berkas === "ditolak"
                    ? "Belum"
                    : "sudah"}
                </option>
                <option value="setuju">Setuju</option>
                <option value="ditolak">Ditolak</option>
              </select>
            </td>
            <td className="px-3 py-2 whitespace-nowrap">{item.jam_akad}</td>
            <td className="px-3 py-2 whitespace-nowrap">
              {new Date(item.tanggal_akad).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;
