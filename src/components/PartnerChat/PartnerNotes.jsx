import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useSettings } from "@/context/SettingsContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/**
 * PartnerNotes - Floating notes icon and dialog for partner chat
 * - Shows floating icon when notes are available
 * - Opens dialog once per login session (stored in localStorage)
 * - Clears seen flag on logout or when token is missing
 * - Uses shadcn Dialog component
 */
const PartnerNotes = () => {
  const { chat: chatData } = useSettings();
  const [showNotesDialog, setShowNotesDialog] = useState(false);

  const STORAGE_KEY = "partnerNotesSeen";

  // Helper to get auth token from cookies
  const getAuthToken = () => {
    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((c) => c.trim().startsWith("auth_token="));
    return authCookie ? authCookie.split("=")[1] : null;
  };

  // Open dialog once per login session
  useEffect(() => {
    const hasSeenNotes = localStorage.getItem(STORAGE_KEY);
    const hasAuthToken = getAuthToken();

    if (chatData?.chat_notes && !hasSeenNotes && hasAuthToken) {
      setShowNotesDialog(true);
      localStorage.setItem(STORAGE_KEY, "true");
    }

    // If no token, clear the flag
    if (!hasAuthToken) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [chatData]);

  // Monitor token changes and clear flag on logout
  useEffect(() => {
    const checkToken = () => {
      const hasAuthToken = getAuthToken();
      if (!hasAuthToken) {
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    // Check periodically for token changes
    const interval = setInterval(checkToken, 5000);

    // Also listen for storage events (in case of logout from another tab)
    const handleStorage = (e) => {
      if (e.key === "logout") {
        localStorage.removeItem(STORAGE_KEY);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Don't render if no notes available
  if (!chatData?.chat_notes) {
    return null;
  }

  return (
    <>
      {/* Floating notes icon */}
      <div
        className="pc-notes-float"
        onClick={() => setShowNotesDialog(true)}
        title="View chat notes"
      >
        <Icon icon="mdi:note-text" />
      </div>

      {/* Notes dialog using shadcn */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent
          size="lg"
          className="max-h-[80vh] overflow-y-auto transition-all duration-300 ease-in-out transform border-0 shadow-2xl"
        >
          <DialogHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
            <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <Icon icon="mdi:note-text" className="text-white text-lg" />
              </div>
              <div>
                <div>Chat Notes</div>
                <div className="text-sm font-normal text-gray-600 mt-1">
                  Important information & guidelines
                </div>
              </div>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Important information and guidelines for using the partner chat
            </DialogDescription>
          </DialogHeader>
          <div className="pc-notes-content px-6 py-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div dangerouslySetInnerHTML={{ __html: chatData.chat_notes }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Styles */}
      <style>{`
        .pc-notes-float {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #5685ce 0%, #3c629d 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(86,133,206,0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          animation: pc-notes-float-in 0.5s ease-out;
        }
        .pc-notes-float:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 8px 30px rgba(86,133,206,0.6);
          background: linear-gradient(135deg, #6b95db 0%, #4a71b3 100%);
        }
        .pc-notes-float:active {
          transform: translateY(-2px) scale(0.98);
          transition: all 0.1s ease;
        }
        .pc-notes-float svg {
          color: white;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }
        .pc-notes-float:hover svg {
          transform: rotate(15deg);
        }

        @keyframes pc-notes-float-in {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .pc-notes-content ul {
          margin: 0;
          padding-left: 1.5rem;
        }
        .pc-notes-content li {
          margin-bottom: 0.75rem;
          color: #374151;
          line-height: 1.6;
          position: relative;
          padding-left: 0.5rem;
        }
        .pc-notes-content li::before {
          content: "•";
          position: absolute;
          left: -1rem;
          color: #3b82f6;
          font-weight: bold;
          font-size: 1.2rem;
          line-height: 1;
        }
        .pc-notes-content strong {
          color: #1f2937;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pc-notes-content em {
          color: #6b7280;
          font-style: italic;
        }
      `}</style>
    </>
  );
};

export default PartnerNotes;
