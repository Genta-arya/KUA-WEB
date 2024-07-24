import prisma from "../../../config/Prisma.js";

export const CheckLoginController = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ status: 400, message: "Token not found" });
  }

  try {
    const findUser = await prisma.user.findFirst({
      where: {
        token,
      },
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
        isCompleted: true,
        role: true,
        token: true,
        profil: {
          select: {
            id: true,
            nama_lengkap: true,
            j_kelamin: true,
            noHp: true,
            nik: true,
          },
        },
        berkas: {
          select: {
            id: true,

            alamat: true,
          },
        },
      },
    });

    if (!findUser) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Authorized",
      data: findUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
