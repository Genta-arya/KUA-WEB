import { AxiosInstace } from "../../AxiosConfig";

export const HandleUpdateProfil = async (data) => {
  try {
    const response = await AxiosInstace.put("/auth/user/profil", { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};
