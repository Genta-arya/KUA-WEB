
import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';

// Muat variabel lingkungan
dotenv.config();

// Buat instance Core API
export const coreApi = new midtransClient.CoreApi({
    isProduction: false, // ubah ke true jika sudah siap produksi
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY
});
