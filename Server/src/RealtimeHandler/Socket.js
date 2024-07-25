import { io } from "../../index.js";

export const Triger = async (data) => {
    console.log(data);

  try {
    io.emit("refresh", { refresh: true });
    console.log("refresh data")
  } catch (error) {
    console.log(error);
  }
};
