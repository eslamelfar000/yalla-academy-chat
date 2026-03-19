import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllTeachers from "../pages/AllTeachers/AllTeachers";
import RootLayout from "../../RootLayout"; // Ensure you have a layout component
import Contact from "../pages/Contact/Contact";
import TeacherPage from "../pages/TeacherPage/TeacherPage";
import BookingPage from "../pages/BookingPage/BookingPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ChatPage from "../pages/Chat/ChatPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage"; // Import your UserProfilePage component
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import EmailVerification from "@/pages/EmailVerification/EmailVerification";
import AboutUs from "../pages/AboutUs/AboutUs";
import SuccessPage from "../pages/SuccessPage/SuccessPage";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import PartnerLogin from "../pages/PartnerLogin/PartnerLogin";
import PartnerChatPage from "../pages/PartnerChat/PartnerChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Root layout containing <Outlet />
    children: [
      {
        index: true, // This means "/" will render <Home />
        element: <Home />,
      },
      {
        path: "/teachers",
        element: <AllTeachers />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/teacher-page/:id",
        element: <TeacherPage />,
      },
      {
        path: "/booking/:id",
        element: <BookingPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/profile",
        element: <UserProfilePage />,
      },
      {
        path: "/profile-setting",
        element: <UserProfilePage />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/verify-email",
        element: <EmailVerification />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      {
        path: "/terms",
        element: <TermsAndConditions />,
      },
    ],
  },
  // ── Partner routes (standalone, outside RootLayout) ──
  {
    path: "/chat-login",
    element: <PartnerLogin />,
  },
  {
    path: "/partner-chat",
    element: <PartnerChatPage />,
  },
]);
