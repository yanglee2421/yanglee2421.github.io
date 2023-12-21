// React Imports
import React from "react";
import ReactDOM from "react-dom/client";

// App Imports
import { App } from "./App";

// I18n Imports
import "@/i18n";

// Font Imports
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

const container = (() => {
  const existedEl = document.getElementById("root");
  if (existedEl) {
    return existedEl;
  }

  const newEl = document.createElement("div");
  newEl.id = "root";
  document.body.append(newEl);
  return newEl;
})();

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
