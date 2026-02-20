import React from "react";
import { enableMapSet } from "immer";
import { createRoot } from "react-dom/client";
import "dayjs/locale/en";
import "dayjs/locale/zh";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { App } from "./App";
import "@/locales/i18n";

enableMapSet();
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
