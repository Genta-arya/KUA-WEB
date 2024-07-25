import express from "express";
import { createServer } from "http";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import AuthRouter from "./src/route/Auth/AuthRouter.js";
import { Server } from "socket.io";
import PermohonanRouter from "./src/route/Permohonan/PermohonanRouter.js";
import { getNotif } from "./src/controller/Notification/NotifController.js";
import PaymentRouter from "./src/route/Payment/PaymentRouter.js";
import { Triger } from "./src/RealtimeHandler/Socket.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use((req, res, next) => {
  req.io = io; // Make io accessible in req
  next();
});

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  socket.join(userId);

  socket.on("getNotif", (data) => {
   
    getNotif(socket, io, data);
  });

  socket.on("refresh", (data) => {
    Triger(data);
  });

  socket.on("disconnect", () => {});
});

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many requests from this IP, please try again later.",
    });
  },
});

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(limiter);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/file", express.static(path.resolve("file")));
app.use('/api/v1/payment', PaymentRouter)
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/permohonan", PermohonanRouter);

httpServer.listen(port, () => {
  console.log("Server running on port " + port);
});

export {io}