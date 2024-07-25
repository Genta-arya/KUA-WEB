import schedule from "../../Views/JadwalNikah/Data";
import jsPDF from "jspdf";
export const formatRupiah = (angka) => {
  if (typeof angka !== 'number') return '';
  
  const format = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
  
  return format.format(angka);
};


export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", options).format(date); // 'id-ID' for Indonesian locale
};

export const isDateTimeAvailable = (date, time) => {
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const newTimeInMinutes = timeToMinutes(time);

  const timeRange = 60;

  for (let entry of schedule) {
    if (entry.date === date) {
      const existingTimeInMinutes = timeToMinutes(entry.time);

      if (Math.abs(newTimeInMinutes - existingTimeInMinutes) < timeRange) {
        return false;
      }
    }
  }

  return true;
};



export const generatePDF = (item , username) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Bukti Pembayaran", 105, 20, null, null, "center");

  // Subtitle
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Kantor Urusan Agama Benua Kayong", 105, 30, null, null, "center");
  doc.setFont("helvetica", "bold");
  doc.text("Kabupaten Ketapang Kalimantan Barat", 105, 36, null, null, "center");

  // Add a line under the title
  doc.setLineWidth(0.5);
  doc.line(20, 42, 190, 42);

  // Body
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Nama: ${username}`, 20, 55);
  doc.text(`Tanggal Akad: ${formatDate(item.tanggal_akad)}`, 20, 65);
  doc.text(`Jam Akad: ${item.jam_akad}`, 20, 75);
  doc.text(
    `Biaya: ${formatRupiah(
      Number(item.payments[0]?.biaya.replace(/[^0-9.-]+/g, ""))
    )}`,
    20,
    85
  );
  doc.text(`Status Bayar: Lunas`, 20, 95);

  // Add a rectangle around the content
  doc.setLineWidth(0.2);
  doc.rect(15, 45, 180, 60);

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Terima kasih telah menggunakan layanan kami.",
    105,
    120,
    null,
    null,
    "center"
  );

  // Add another line at the bottom
  doc.setLineWidth(0.5);
  doc.line(20, 125, 190, 125);

  // Additional footer text
  doc.setFontSize(8);
  doc.text(
    "Jika ada pertanyaan, silakan hubungi layanan pelanggan kami di xxx-xxx-xxx",
    105,
    130,
    null,
    null,
    "center"
  );

  doc.save("bukti_pembayaran.pdf");
};


export const generateRequestLetterPDF = (item, username) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Bukti Surat Permohonan", 105, 20, null, null, "center");

  // Subtitle
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Kantor Urusan Agama Benua Kayong", 105, 30, null, null, "center");
  doc.setFont("helvetica", "bold");
  doc.text("Kabupaten Ketapang Kalimantan Barat", 105, 36, null, null, "center");

  // Add a line under the title
  doc.setLineWidth(0.5);
  doc.line(20, 42, 190, 42);

  // Body
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Nama: ${username}`, 20, 55);
  doc.text(`Tanggal Akad: ${formatDate(item.tanggal_akad)}`, 20, 65);
  doc.text(`Jam Akad: ${item.jam_akad}`, 20, 75);
  doc.text(
    `Status Permohonan: ${item.status_berkas === "pending" ? "Sedang ditinjau" : item.status_berkas === "ditolak" ? "Ditolak" : item.status_berkas === "setuju" ? "Diterima" : ""}`,
    20,
    85
  );

  // Add a rectangle around the content
  doc.setLineWidth(0.2);
  doc.rect(15, 45, 180, 60);

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Terima kasih telah menggunakan layanan kami.",
    105,
    120,
    null,
    null,
    "center"
  );

  // Add another line at the bottom
  doc.setLineWidth(0.5);
  doc.line(20, 125, 190, 125);

  // Additional footer text
  doc.setFontSize(8);
  doc.text(
    "Jika ada pertanyaan, silakan hubungi layanan pelanggan kami di xxx-xxx-xxx",
    105,
    130,
    null,
    null,
    "center"
  );

  doc.save("bukti_surat_permohonan.pdf");
};