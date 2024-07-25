import axios from "axios";
import prisma from "../../config/Prisma.js";
import { io } from "../../../index.js";

export const Payment = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id and status are required" });
  }

  try {
    // Ambil detail pembayaran dari database
    const payment = await prisma.payment.findFirst({
      where: { order_id: id },
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const response = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${id}/status`,
      {
        headers: {
          Authorization: `Basic U0ItTWlkLXNlcnZlci0xeUxxRlNmbS1XdkVhWGVBWTJfekZTelM6`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const { status_code, transaction_status } = response.data;

    if (status_code === "200") {
      await prisma.payment.update({
        where: { order_id: id },
        data: {
          status_bayar: transaction_status,
        },
      });
    }
    io.emit('paymentStatusUpdated', { refresh: true});
    return res.status(200).json({
      message: "Payment status updated successfully",
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

