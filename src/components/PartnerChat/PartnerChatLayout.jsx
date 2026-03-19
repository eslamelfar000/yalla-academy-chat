import React from "react";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import usePartnerAuthToken, {
  PARTNER_USER_KEY,
} from "@/hooks/usePartnerAuthToken";
import logo from "../../assets/logo.png";
import PartnerNotes from "./PartnerNotes";

// Read partner user data (isolated from student yall_user_data)
const getPartnerUser = () => {
  try {
    return JSON.parse(localStorage.getItem(PARTNER_USER_KEY) || "null");
  } catch {
    return null;
  }
};

/**
 * PartnerChatLayout
 * Standalone full-screen layout for the Partner Chat section.
 * - No Navbar / Footer from main app
 * - Uses partner_auth_token for auth guard
 * - Displays partner user data from partner_user_data
 */
const PartnerChatLayout = ({ children }) => {
  const { logout } = usePartnerAuthToken();
  const navigate = useNavigate();
  const userData = getPartnerUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <style>{`
        .pc-layout-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f5f6f9;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }

        /* ── Top bar ── */
        .pc-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1.5rem;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          flex-shrink: 0;
          z-index: 50;
          position: sticky;
          top: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .pc-topbar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .pc-topbar-logo img { height: 36px; object-fit: contain; }
        .pc-partner-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #5685ce;
          background: #eef3fb;
          border: 1px solid #b8d0ef;
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
        }
        .pc-topbar-right {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .pc-user-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: #374151;
        }
        .pc-user-name {
          font-weight: 600;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pc-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #ef4444;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 0.4rem 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pc-logout-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        /* ── Content area ── */
        .pc-content {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
      `}</style>

      <div className="pc-layout-root">
        {/* Sticky top bar */}
        <header className="pc-topbar">
          <div className="pc-topbar-logo">
            {/* <img src={logo} alt="Yalla System" /> */}
            <span className="pc-partner-badge">Chat</span>
          </div>

          <div className="pc-topbar-right">
            {userData && (
              <div className="pc-user-chip">
                <Avatar style={{ width: 30, height: 30 }}>
                  <AvatarImage
                    src={userData?.user?.image}
                    alt={userData?.user?.name}
                  />
                  <AvatarFallback style={{ fontSize: "0.65rem" }}>
                    {userData?.user?.name?.slice(0, 2).toUpperCase() || "PT"}
                  </AvatarFallback>
                </Avatar>
                <span className="pc-user-name">
                  {userData?.user?.name || "Partner"}
                </span>
              </div>
            )}

            <button className="pc-logout-btn" onClick={handleLogout}>
              <Icon icon="mdi:logout" style={{ fontSize: "0.9rem" }} />
              Sign out
            </button>
          </div>
        </header>

        {/* Main chat content */}
        <main className="pc-content">{children}</main>

        {/* Partner Notes Component */}
        <PartnerNotes />
      </div>
    </>
  );
};

export default PartnerChatLayout;
