import { AxiosInstace } from "../../AxiosConfig";

export const HandleCreatePermohonan = async (formData) => {
  try {
    const response = await AxiosInstace.post("/permohonan/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in HandleCreatePermohonan:", error);
    throw error;
  }
};

export const HandleGetPermohonan = async ({ userId, role }) => {
  try {
    const response = await AxiosInstace.post("/permohonan/data", {
      userId,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Error in HandleGetPermohonan:", error);
    throw error;
  }
};

export const HandleChangeStatusPermohonan = async ({ status, userId, id , keterangan }) => {
   
  try {
    const response = await AxiosInstace.put(`/permohonan/data/${id}/status`, {
      userId,
      status,
      keterangan,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
