import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";

const FloatingWhatsApp = () => {
  const { whatsapp, isLoading } = useSettings();

  // Don't render if loading or no WhatsApp number
  if (isLoading || !whatsapp) {
    return null;
  }

  // Format phone number for WhatsApp URL (remove any non-digit characters except +)
  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, "");
    // If it doesn't start with +, add it
    if (!cleaned.startsWith("+")) {
      cleaned = "+" + cleaned;
    }
    return cleaned;
  };

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${formatPhoneNumber(whatsapp)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default FloatingWhatsApp;

