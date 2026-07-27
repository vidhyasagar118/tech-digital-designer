import React from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/common.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
            <Analytics />

    </BrowserRouter>
  </StrictMode>
);
