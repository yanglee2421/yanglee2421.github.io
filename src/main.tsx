// React Imports
import React from "react";
import ReactDOM from "react-dom/client";

// App Imports
import { App } from "./App";

// I18n Imports
import "@/i18n";

// Font Imports
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// FakeDB Imports
import "@/api/fakedb";

// HTML Element
const el = document.querySelector("#root");
bootstrap(el);

function bootstrap(el: Element | null) {
  if (!el) {
    console.error("Invalid Element");
    return;
  }

  // React Root
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
