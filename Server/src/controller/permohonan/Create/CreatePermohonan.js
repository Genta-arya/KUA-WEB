import prisma from "../../../config/Prisma.js";
import fs from "fs";

export const CreatePermohonan = async (req, res) => {
  const {
    name,
    gender,
    nik,
    phone,
    marriageDate,
    marriageTime,
    status_cerai,
    kelurahan,
    alamat,
    userId,
  } = req.body;

  const files = req.files; // File uploads dari Multer
  const io = req.io;
  console.log(req.body);

  // Check if all required fields are provided
  if (
    !name ||
    !gender ||
    !nik ||
    !phone ||
    !marriageDate ||
    !marriageTime ||
    !status_cerai ||
    !alamat ||
    !kelurahan ||
    !userId
  ) {
    // Delete uploaded files if any
    if (files) {
      Object.values(files)
        .flat()
        .forEach((file) => {
          fs.unlink(file.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        });
    }

    return res.status(400).json({
      status: 400,
      message: "All fields are required",
    });
  }

  // Check if suratCerai file is provided if status_cerai is "sudah"
  if (status_cerai === "sudah" && (!files || !files.suratCerai)) {
    // Delete uploaded files if any
    if (files) {
      Object.values(files)
        .flat()
        .forEach((file) => {
          fs.unlink(file.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        });
    }

    return res.status(400).json({
      status: 400,
      message: "Surat cerai is required when status_cerai is 'sudah'",
    });
  }

  let fileUrl, suratCeraiUrl;
  if (files && files.file) {
    // URL file if stored locally
    fileUrl = `${process.env.BASE_URL_DEV}/file/${files.file[0].filename}`;
  }
  if (files && files.suratCerai) {
    suratCeraiUrl = `${process.env.BASE_URL_DEV}/file/${files.suratCerai[0].filename}`;
  }

  try {
    const newPermohonan = await prisma.berkas.create({
      data: {
        nama_lengkap: name,
        j_kelamin: gender,
        nik,
        noHp: phone,
        tanggal_akad: new Date(marriageDate),
        jam_akad: marriageTime,
        status_cerai,
        status_berkas: "pending",
        kelurahan,
        alamat,
        berkas: fileUrl,
        berkas_cerai: suratCeraiUrl,
        user: {
          connect: { id: userId },
        },
      },
    });

    const notificationMessage = "Pemberkasan akan diproses dan ditinjau terlebih dahulu";
    io.to(userId).emit("permohonanStatus", { message: notificationMessage });

  
    await prisma.notif.create({
      data: {
        id_user: userId,
        message: notificationMessage,
      },
    });

    return res.status(201).json({
      status: 201,
      message: "Permohonan created successfully",
      data: newPermohonan,
    });
  } catch (error) {
    console.error("Error creating permohonan:", error);

    if (files) {
      Object.values(files)
        .flat()
        .forEach((file) => {
          fs.unlink(file.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        });
    }

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
