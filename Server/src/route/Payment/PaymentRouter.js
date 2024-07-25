import express from "express";
import { Payment } from "../../controller/Payment/PaymentController.js";

const PaymentRouter = express.Router();



PaymentRouter.post('/data/status', Payment);

export default PaymentRouter;
