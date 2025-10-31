// src/routes/router.jsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Devices from "@/pages/Devices";
import External from "@/pages/External";
import GenericModule from "../pages/GenericModule";
import ProtectedRoute from "@/routes/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/external", element: <External /> },
      
      { path: "/time/dashboard", element: <Home /> }, // Placeholder
      { path: "/config/generals/company", element: <Home /> },
      { path: "/config/generals/structures", element: <Home /> },
      { path: "/config/generals/devices", element: <Devices /> },
      
      { path: "/config/generals/devices", element: <Devices /> }, 
      { path: "*", element: <GenericModule /> },
    ],
  },

  // fallback
  { path: "*", element: <Navigate to="/" replace /> },
]);