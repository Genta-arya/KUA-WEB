import prisma from "../../../config/Prisma.js";

export const updateStatusPermohonan = async (req, res) => {
  const { id } = req.params; // ID permohonan yang ingin diperbarui
  const { status, userId } = req.body; // Status baru yang diterima dari request
  const io = req.io;

 
 
  try {
    // Validasi status yang diterima
    if (!["setuju", "ditolak", "pending"].includes(status)) {
      return res.status(400).json({ message: "Status tidak valid" });
    }

    // Perbarui status permohonan di database
    const updatedPermohonan = await prisma.berkas.update({
      where: { id: id },
      data: { status_berkas: status },
    });

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

    // Kirimkan response berhasil
    res
      .status(200)
      .json({ message: "Status berhasil diperbarui", data: updatedPermohonan });
  } catch (error) {
    console.error(error);
    // Kirimkan response error
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat memperbarui status",
        error: error.message,
      });
  }
};
