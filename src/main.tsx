import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import React from "react";
import { createRoot } from "react-dom/client";
import "@/locales/i18n";
import { App } from "./App";

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
