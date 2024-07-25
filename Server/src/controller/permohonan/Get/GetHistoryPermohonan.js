import axios from "axios";
import prisma from "../../../config/Prisma.js";

export const getHistoryPermohonan = async (req, res) => {
  const { userId, role  } = req.body;

  if (!userId) {
    return res.status(400).json({
      message: "userId is required",
    });
  }

  if (!role) {
    return res.status(400).json({
      message: "role is required",
    });
  }

  let data;

  try {
    if (role === "user") {
      data = await prisma.berkas.findMany({
        where: {
          userId,
        },
        select: {
          userId: true,
          tanggal_akad: true,
          status_berkas: true,
          jam_akad: true,
          ket: true,

          berkas: true,
          payments: true,
        },
      });
    } else {
      data = await prisma.berkas.findMany({
        include: {
          payments: true,
        },
      });
    }

    return res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
