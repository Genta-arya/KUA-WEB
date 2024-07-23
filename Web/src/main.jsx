import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider } from "react-router-dom"
import MainAuth from './Views/Authentikasi/MainAuth.jsx'
import MainBeranda from './Views/Beranda/MainBeranda.jsx'

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
])
ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />



    

)
