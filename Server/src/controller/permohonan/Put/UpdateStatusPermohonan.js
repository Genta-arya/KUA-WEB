import { coreApi } from "../../../config/MidransConfig.js";
import prisma from "../../../config/Prisma.js";

export const updateStatusPermohonan = async (req, res) => {
  const { id } = req.params; // ID permohonan yang ingin diperbarui
  const { status, userId, keterangan } = req.body; // Status baru yang diterima dari request
  const io = req.io;
  let updatedPermohonan;

  try {
    // Validasi status yang diterima
    if (!["setuju", "ditolak", "pending"].includes(status)) {
      return res.status(400).json({ message: "Status tidak valid" });
    }

    const currentPermohonan = await prisma.berkas.findUnique({
      where: { id: id },
      select: { status_berkas: true },
    });

    if (
      currentPermohonan.status_berkas === "setuju" &&
      (status === "ditolak" || status === "pending")
    ) {
      await prisma.payment.deleteMany({
        where: { berkasId: id },
      });
    }

    if (status === "ditolak") {
      if (!keterangan) {
        return res.status(400).json({ message: "Keterangan harus diisi" });
      }

      updatedPermohonan = await prisma.berkas.update({
        where: { id: id },
        data: { status_berkas: status, ket: keterangan },
      });
    } else {
      updatedPermohonan = await prisma.berkas.update({
        where: { id: id },
        data: { status_berkas: status },
      });
    }
    if (status === "setuju") {
      const orderId = `order-${id}-${Date.now()}`;
      const grossAmount = 600000; // Tagihan sebesar 600rb

      const parameter = {
        payment_type: "bank_transfer",
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        bank_transfer: {
          bank: "bca",
        },
        customer_details: {
          user_id: userId,
        },
      };

      const transaction = await coreApi.charge(parameter);
      console.log(transaction);
      const {
        va_numbers,
        transaction_status,
        order_id,
        gross_amount,
        status_code,
        expiry_time,
      } = transaction;

      console.log(va_numbers[0].va_number);
      console.log(expiry_time);
      console.log(status_code);

      await prisma.payment.create({
        data: {
          berkasId: id,
          order_id: order_id,
          biaya: gross_amount,
          expiry_time: new Date(expiry_time),
          status_bayar: transaction_status,
          va_number: va_numbers[0].va_number,
          createdAt: new Date(),
        },
      });
    }

    let notificationMessage = "";
    switch (status) {
      case "setuju":
        notificationMessage = "Permohonan Anda telah disetujui.";
        break;
      case "ditolak":
        notificationMessage = "Permohonan Anda telah ditolak.";
        break;
      case "pending":
        notificationMessage = "Permohonan Anda sedang dalam proses Pengecekan";
        break;
      default:
        notificationMessage = "Status permohonan diperbarui.";
        break;
    }

    io.to(userId).emit("permohonanStatus", { message: notificationMessage });

    await prisma.notif.create({
      data: {
        id_user: userId,
        message: notificationMessage,
      },
    });

    res
      .status(200)
      .json({ message: "Status berhasil diperbarui", data: updatedPermohonan });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui status",
      error: error.message,
    });
  }
};
