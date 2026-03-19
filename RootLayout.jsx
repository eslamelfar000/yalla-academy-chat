import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import FloatingWhatsApp from "@/components/FloatingWhatsApp/FloatingWhatsApp";

const RootLayout = () => {
  const { pathname } = useLocation();
  const currentStep = useSelector((state) => state.step.currentStep);

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname, currentStep]);

  return (
    <div>
      <Outlet /> {/* This renders the child components */}
      {/* <FloatingWhatsApp /> */}
    </div>
  );
};

export default RootLayout;
