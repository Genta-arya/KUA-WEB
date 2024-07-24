import { AxiosInstace } from "../../AxiosConfig";

export const HandlePayment = async (id) => {
  try {
    const response = await AxiosInstace.post(`/permohonan/data/payment`, {
      id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
