import React, { createContext, useContext } from "react";
import { useGetSettings } from "../hooks/useGetSettings";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const { data: settingsData, isLoading, error } = useGetSettings();

  const value = {
    settings: settingsData?.data || {},
    isLoading,
    error,
    banner: settingsData?.data || {},
    contact: settingsData?.data || {},
    about_us: settingsData?.data || {},
    whatsapp: settingsData?.data?.whatsapp || "",
    chat: settingsData?.data || {},
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
