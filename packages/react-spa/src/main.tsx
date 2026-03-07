import "@/locales/i18n";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "dayjs/locale/en";
import "dayjs/locale/zh";
import { enableMapSet } from "immer";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

enableMapSet();
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
