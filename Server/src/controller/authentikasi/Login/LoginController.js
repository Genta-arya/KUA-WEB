import prisma from "../../../config/Prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const LoginController = async (req, res) => {
  const { data } = req.body;

  if (!data.email || !data.password) {
    return res.status(400).json({
      status: 400,
      message: "all field is required",
    });
  }

  const findUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },

    select: {
      id: true,
      username: true,
      email: true,
      status: true,
      isCompleted: true,

      role: true,
    },
  });

  if (!findUser) {
    return res.status(400).json({
      status: 400,
      message: "Username atau password salah",
    });
  }
  const getPassword = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
    select: {
      password: true,
    },
  });
  try {
    const checkPassword = await bcrypt.compare(
      data.password,
      getPassword.password
    );

    if (!checkPassword) {
      return res.status(400).json({
        status: 400,
        message: "wrong password",
      });
    }

    const generateJwt = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    };
    const token = generateJwt(findUser.id);

    const checkTokenAvaible = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!checkTokenAvaible) {
      await prisma.user.update({
        where: { id: findUser.id },
        data: {
          token: token,
          status: true,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: findUser.id },
        data: {
          status: true,
        },
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Login success",
      data: {
        user: findUser,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "server error",
    });
  }
};

export const handleLogout = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      message: "token not found",
    });
  }
  try {
    const finduser = await prisma.user.findFirst({
      where: {
        token: token,
      },
      select: {
        id: true,
      },
    });

    if (!finduser) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    await prisma.user.update({
      where: {
        id: finduser.id,
      },
      data: {
        token: null,
        status: false,
      },
    });
    return res.status(200).json({
      message: "logout success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
