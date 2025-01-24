/*
 * React Project Index
 * by Alex JPS, Eric Edwards
 * 2024-03-06
 *
 * Handles rendering of the app
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
