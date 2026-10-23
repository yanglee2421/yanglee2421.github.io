import { CustomLayout } from "@/components/layout/custom";
import { MuiProvider } from "@/components/layout/mui";
import React from "react";
import { Outlet } from "react-router";

export const DashLayout = () => {
  return (
    <MuiProvider>
      <CustomLayout>
        <React.ViewTransition>
          <Outlet />
        </React.ViewTransition>
      </CustomLayout>
    </MuiProvider>
  );
};
