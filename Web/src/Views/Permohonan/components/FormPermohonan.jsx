import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useLoading from "../../../lib/Zustand/LoadingStore";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import schedule from "../../JadwalNikah/Data";
import { kelurahanData } from "../DataLurah";
import { isDateTimeAvailable } from "../../../lib/Utils/Utils";

const FormPermohonan = () => {
  const [status, setStatus] = useState("belum"); // Default to 'Belum Cerai'
  const [file, setFile] = useState(null);
  const [suratCerai, setSuratCerai] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nik, setNik] = useState("");
  const [phone, setPhone] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [marriageTime, setMarriageTime] = useState("");
  const [kelurahan, setKelurahan] = useState("");

  const navigate = useNavigate();
  const { isLoading, setLoading } = useLoading();

 

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSuratCeraiChange = (e) => {
    setSuratCerai(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the selected date and time is available
    if (!isDateTimeAvailable(marriageDate, marriageTime)) {
      toast.error("Tanggal dan waktu pernikahan sudah terdaftar di jadwal.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("nik", nik);
    formData.append("phone", phone);
    formData.append("marriageDate", marriageDate);
    formData.append("marriageTime", marriageTime);
    formData.append("file", file);

    if (status === "sudah") {
      formData.append("suratCerai", suratCerai);
    }

    toast.success("Permohonan Berhasil", {
      onAutoClose: () => {
        setLoading(false);
        navigate("/beranda");
      },
    });

    // Perform your form submission logic here
    console.log("Form submitted:", Object.fromEntries(formData.entries()));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" htmlFor="name">
          Nama:
        </label>
        <input
          type="text"
          id="name"
          required
          placeholder="Nama lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border text-xs border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" htmlFor="gender">
          Jenis Kelamin:
        </label>
        <select
          id="gender"
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
        >
          <option value="">Pilih jenis kelamin</option>
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" htmlFor="nik">
          NIK:
        </label>
        <input
          type="text"
          id="nik"
          required
          placeholder="Nomor Induk Kependudukan"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          className="w-full border text-xs border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" htmlFor="phone">
          No HP:
        </label>
        <input
          type="tel"
          id="phone"
          required
          placeholder="Nomor telepon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border text-xs border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" htmlFor="kelurahan">
          Kelurahan:
        </label>
        <select
          id="kelurahan"
          required
          value={kelurahan}
          onChange={(e) => setKelurahan(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
        >
          <option value="">Pilih kelurahan</option>
          {kelurahanData.map((kelurahan) => (
            <option key={kelurahan.id} value={kelurahan.name}>
              {kelurahan.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-xs font-semibold mb-1"
          htmlFor="marriageDate"
        >
          Tanggal Pernikahan:
        </label>
        <input
          type="date"
          id="marriageDate"
          required
          value={marriageDate}
          onChange={(e) => setMarriageDate(e.target.value)}
          className="w-full border text-xs border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-xs font-semibold mb-1"
          htmlFor="marriageTime"
        >
          Jam Pernikahan:
        </label>
        <input
          type="time"
          id="marriageTime"
          required
          value={marriageTime}
          onChange={(e) => setMarriageTime(e.target.value)}
          className="w-full border text-xs border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" htmlFor="keperluan">
          Keperluan:
        </label>
        <select
          id="keperluan"
          required
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
        >
          <option value="nikah">Permohonan Nikah</option>
          {/* Add other options if needed */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" htmlFor="status">
          Status:
        </label>
        <select
          id="status"
          value={status}
          required
          onChange={handleStatusChange}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
        >
          <option value="belum">Belum Cerai</option>
          <option value="sudah">Sudah Cerai</option>
        </select>
      </div>

      {status === "sudah" && (
        <div className="mb-4">
          <label
            className="block text-xs font-semibold mb-1"
            htmlFor="surat-cerai"
          >
            Surat Keterangan Cerai:
          </label>
          <input
            type="file"
            id="surat-cerai"
            onChange={handleSuratCeraiChange}
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1" htmlFor="file">
          Berkas:
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-hijau-tua disabled:bg-white disabled:border disabled:py-2 disabled:border-hijau-tua  w-full text-white px-4 py-2 rounded hover:opacity-90 transition-colors text-xs"
      >
        {isLoading ? <Loading /> : "Kirim Permohonan"}
      </button>
    </form>
  );
};

export default FormPermohonan;
