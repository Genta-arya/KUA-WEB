import { create } from "zustand";

const authStore = create((set) => ({
  id_user: null,
  id: null,
  role: null,
  isLoggedIn: false,
  token: null,
  email: null,
  username: null,
  isModal: true,
  nik: null,
  jk: null,
  noHp: null,
  nama_lengkap: null,

  setLoggedIn: (
    id_user,
    id,
    role,
    isLoggedIn,
    token,
    email,
    username,
    isModal,
    nik,
    jk,
    noHp,
    nama_lengkap
  ) =>
    set((state) => ({
      id_user,
      id,
      role,
      isLoggedIn,
      token,
      email,
      username,
      isModal,
      nik,
      jk,
      noHp,
      nama_lengkap,
    })),

  setModal: (
    isModal // Function to set isModal
  ) =>
    set((state) => ({
      isModal,
    })),
  logout: () =>
    set((state) => ({
      id_user: null,
      id: null,
      role: null,
      isLoggedIn: false,
      isModal: true,
      token: null,
      email: null,
      username: null,
      nik: null,
      jk: null,
      noHp: null,
      nama_lengkap: null,
    })),
}));

export default authStore;
