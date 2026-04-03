import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PartnerChatLayout from "../../components/PartnerChat/PartnerChatLayout";
import PartnerChatInner from "../../components/PartnerChat/PartnerChatInner";
import usePartnerAuthToken from "@/hooks/usePartnerAuthToken";

/**
 * PartnerChatPage
 * Auth-guarded entry point for the partner chat section.
 * - Checks partner_auth_token (NOT student yall_auth_token)
 * - Renders its own layout + its own isolated chat component
 */
function PartnerChatPage() {
  const { getToken } = usePartnerAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/", { replace: true });
    }
  }, [getToken]);

  return (
    <PartnerChatLayout>
      <div
        style={{
          padding: "1.25rem",
          height: "calc(100vh - 57px)", // full height minus topbar
          overflow: "hidden",
        }}
      >
        <PartnerChatInner />
      </div>
    </PartnerChatLayout>
  );
}

export default PartnerChatPage;
