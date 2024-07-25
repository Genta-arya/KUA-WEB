import prisma from "../../config/Prisma.js";

export const getNotif = async (socket, io, data) => {
  const { userId, status, notifId, refresh } = data || {};

  let notif;

  try {
    if (status === true) {
      await prisma.notif.updateMany({
        where: {
          id: notifId,
        },
        data: {
          status: true,
        },
      });
    }

    if (userId) {
      notif = await prisma.notif.findMany({
        where: {
          id_user: userId,
          status: false,
        },
      });
    }
    if (refresh) {
      notif = await prisma.notif.findMany({
        where: {
          id_user: userId,
          status: false,
        },
      });
    }

    io.to(userId).emit("notif", {
      status: 200,
      data: notif,
    });
  } catch (error) {
    console.log(error);
    socket.emit("notifError", {
      status: 500,
      message: "Internal Server Error",
    });
  }
};


