import React, { useEffect } from "react";
import authStore from "./../Zustand/AuthStore";
import { HandleCheckLogin } from "../../Service/API/Authentikasi/AuthService";
import useLoading from "../Zustand/LoadingStore";
import { useLocation, useNavigate } from "react-router-dom";

const useCheckLogin = () => {
  const {
    id_user,
    id,
    role,
    isModal,
    isLoggedIn,
    token,
    email,
    username,
    nik,
    jk,
    noHp,
    nama_lengkap,
    setLoggedIn,
  } = authStore();
  const { isLoading, setLoading } = useLoading();
  const navigate = useNavigate();
 const {pathname} = useLocation()
  const tokens = localStorage.getItem("token");
  const checkLogin = async () => {
    setLoading(true);
    try {
      const response = await HandleCheckLogin(tokens);
      if (response.data.role === "admin") {
        navigate("/admin/beranda");
      } 


      setLoggedIn(
        response.data.id,
        response.data.profil.id,
        response.data.role,
        true,
        response.data.token,
        response.data.email,
        response.data.username,
        response.data.isCompleted,
        response.data.profil.nik,
        response.data.profil.j_kelamin,
        response.data.profil.noHp,
        response.data.profil.nama_lengkap
      );
    } catch (error) {
      if (error.response.status === 401) {
        setLoggedIn(false, "", "", "");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tokens) {
      checkLogin();
    } else {
      navigate("/");
    }
  }, []);

  return {
    id_user,
    id,
    role,
    isModal,
    isLoggedIn,
    token,
    email,
    username,
    nik,
    jk,
    noHp,
    nama_lengkap,
    isLoading,
  };
};

export default useCheckLogin;
