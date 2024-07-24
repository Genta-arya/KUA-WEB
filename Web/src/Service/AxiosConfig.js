import axios from "axios";

export const AxiosInstace = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

});
