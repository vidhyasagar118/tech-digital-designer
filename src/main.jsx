import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  HelmetProvider,
} from "react-helmet-async";

import {
  Analytics,
} from "@vercel/analytics/react";

import App from "./App";

import {
  AuthProvider,
} from "./context/AuthContext";

import "./styles/common.css"
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Analytics />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);