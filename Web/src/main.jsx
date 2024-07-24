import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider } from "react-router-dom"
import MainAuth from './Views/Authentikasi/MainAuth.jsx'
import MainBeranda from './Views/Beranda/MainBeranda.jsx'
import MainPermohonan from './Views/Permohonan/MainPermohonan.jsx'
import MainSchedule from './Views/JadwalNikah/MainSchedule.jsx'
import MainAkun from './Views/Akun/MainAkun.jsx'
import MainRiwayat from './Views/Riwayat/MainRiwayat.jsx'
import MainAdmin from './Views/Admin/Home/MainAdmin.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainAuth />,
  },
  {
    path: "/register",
    element: <MainAuth />,
  },

  {
    path: "/beranda",
    element: <MainBeranda />,
  },

  {
    path: "/riwayat",
    element: <MainRiwayat />,
  },

  {
    path: "/admin/beranda",
    element: <MainAdmin />,
  },


  {
    path: "/permohonan",
    element: <MainPermohonan />,
  },
  {
    path: "/jadwal",
    element: <MainSchedule />,
  },

  {
    path: "/akun",
    element: <MainAkun />,
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />



    

)
