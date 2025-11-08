"use client";
import React, { useEffect, useState } from "react";
import ProfileInfo from "./profile-info";
import NotificationMessage from "./notification-message";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const user_data = JSON.parse(localStorage.getItem("yall_user_data"));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`nav-tools flex items-center gap-5    ${
        isMobile
          ? "pr-4 mr-4 border-r-2 border-r-default-100"
          : "pl-4 ml-4 border-l-2 border-l-default-100"
      }`}
    >
      {/* <ThemeButton /> */}
      {/* <Inbox /> */}
      <NotificationMessage />
      <ProfileInfo user_data={user_data} />
    </div>
  );
};

export default Header;
