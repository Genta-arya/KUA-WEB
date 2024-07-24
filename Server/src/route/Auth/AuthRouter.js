import express from "express";
import { RegisterController } from "../../controller/authentikasi/Register/RegisterController.js";
import {
  handleLogout,
  LoginController,
} from "../../controller/authentikasi/Login/LoginController.js";
import { CheckLoginController } from "../../controller/authentikasi/CheckLogin/CheckLoginController.js";
import { updateProfi } from "../../controller/authentikasi/UpdateProfil/ProfilController.js";

const AuthRouter = express.Router();
AuthRouter.post("/register", RegisterController);
AuthRouter.post("/login", LoginController);
AuthRouter.post("/user", CheckLoginController);
AuthRouter.put("/user/profil", updateProfi);
AuthRouter.put("/logout", handleLogout);

export default AuthRouter;
