import express from "express";
import { CreatePermohonan } from "../../controller/permohonan/Create/CreatePermohonan.js";
import { upload } from "../../config/Multer.js";
import { getHistoryPermohonan, Payment } from "../../controller/permohonan/Get/GetHistoryPermohonan.js";
import { updateStatusPermohonan } from "../../controller/permohonan/Put/UpdateStatusPermohonan.js";

const PermohonanRouter = express.Router();

PermohonanRouter.post(
  "/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "suratCerai", maxCount: 1 },
  ]),
  CreatePermohonan
);
PermohonanRouter.post("/data", getHistoryPermohonan);
PermohonanRouter.post('/data/payment', Payment);
PermohonanRouter.put('/data/:id/status', updateStatusPermohonan);
export default PermohonanRouter;
