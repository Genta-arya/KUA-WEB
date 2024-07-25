import { AxiosInstace } from "../../AxiosConfig";

export const HandlePayment = async (id) => {
  try {
    const response = await AxiosInstace.post(`/payment/data/status`, {
      id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
