import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../RootLayout"; // Ensure you have a layout component
import PartnerLogin from "../pages/PartnerLogin/PartnerLogin";
import PartnerChatPage from "../pages/PartnerChat/PartnerChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Root layout containing <Outlet />
    children: [
      {
        index: true, // This means "/" will render <Home />
        element: <PartnerLogin />,
      },
      {
        path: "/academy-chat",
        element: <PartnerChatPage />,
      },
    ],
  },
]);
