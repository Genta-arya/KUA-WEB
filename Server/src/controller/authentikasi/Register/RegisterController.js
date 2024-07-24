import prisma from "../../../config/Prisma.js";
import bcrypt from "bcryptjs";
export const RegisterController = async (req, res) => {
  const { data } = req.body;
  console.log(data.username);
  if (!data.username || !data.email || !data.password) {
    return res.status(400).json({
      status: 400,
      message: "all field is required",
    });
  }
  const findUsername = await prisma.user.findFirst({
    where: {
      username: data.username,
    },
  });

  const findUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (findUser || findUsername) {
    return res.status(400).json({
      status: 400,
      message: "user already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    // Start a transaction
    const user = await prisma.$transaction(async (prisma) => {
      // Create the user
      const newUser = await prisma.user.create({
        data: {
          username: data.username,
          password: hashedPassword,
          email: data.email,
        },
      });

      // Create the associated profile
      await prisma.profil.create({
        data: {
          user: {
            connect: {
              id: newUser.id,
            },
          },
          // Populate with default or provided profile data
          nama_lengkap: data.nama_lengkap || "",
          j_kelamin: data.j_kelamin || "",
          noHp: data.noHp || "",
          nik: data.nik || "",
        },
      });

      return newUser;
    });
    res.status(201).json({
      status: 201,
      data: user,
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
