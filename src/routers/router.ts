// Router Imports
import { createHashRouter, createBrowserRouter } from "react-router-dom";
import { routes } from "./router-routes";

const isBuild = import.meta.env.PROD;
export const router = isBuild
  ? createHashRouter(routes)
  : createBrowserRouter(routes, { basename: "/mui" });
