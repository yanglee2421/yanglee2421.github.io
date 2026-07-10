import { Outlet } from "react-router";

export const RootComponent = () => {
  return <Outlet />;
};

export const RootHydrateFallback = () => {
  return <span>loading...</span>;
};
