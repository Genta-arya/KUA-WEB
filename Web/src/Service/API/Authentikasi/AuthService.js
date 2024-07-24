import axios from "axios";
import { AxiosInstace } from "../../AxiosConfig";

export const HandlingRegister = async (data) => {
  try {
    const response = await AxiosInstace.post("/auth/register", { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const HandlingLogin = async (data) => {
  try {
    const response = await AxiosInstace.post("/auth/login", { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const HandleCheckLogin = async (token) => {
  try {
    const response = await AxiosInstace.post("/auth/user", { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const HandleLogout = async (token) => {
  try {
    const response = await AxiosInstace.put("/auth/logout", { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};
