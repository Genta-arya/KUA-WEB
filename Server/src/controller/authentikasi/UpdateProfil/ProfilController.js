import prisma from "../../../config/Prisma.js";

export const updateProfi = async (req, res) => {
  const { data } = req.body;

  if (!data || !data.idUser) {
    return res.status(400).json({
      status: 400,
      message: "all fields are required",
    });
  }

  try {
    // Update the Profil data
    const updateProfil = await prisma.profil.update({
      where: {
        id: data.idUser,
      },
      data: {
        j_kelamin: data.j_kelamin,
        nama_lengkap: data.nama_lengkap,
        nik: data.nik,
        noHp: data.noHp,
      },
    });

    // Update the User model to set isCompleted to true
    await prisma.user.update({
      where: {
        profilId: data.idUser,
      },
      data: {
        isCompleted: true,
      },
    });

    // Fetch the updated User data
    const updatedUser = await prisma.user.findUnique({
      where: {
        profilId: data.idUser,
      },
      select: {
        isCompleted: true,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "data updated",
      data: {
        profil: updateProfil,
      },
      isCompleted: updatedUser.isCompleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
