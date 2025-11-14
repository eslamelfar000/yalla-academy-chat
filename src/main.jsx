import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/Store.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { SettingsProvider } from "./context/SettingsContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <App />
          <Toaster richColors position="top-left" duration={8000} style={{ border: "none" }} />
        </SettingsProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
