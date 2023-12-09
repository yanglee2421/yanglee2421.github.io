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

// FakeDB Imports
import "@/api/fakedb";

init();

function init() {
  const container = document.getElementById("root");

  if (!container) {
    console.error("Can not find element #root");
    return;
  }

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
