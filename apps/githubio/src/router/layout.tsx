import { CustomLayout } from "@/components/layout/custom";
import { MuiProvider } from "@/components/layout/mui";
import { Outlet } from "react-router";

export const DashLayout = () => {
  return (
    <MuiProvider>
      <CustomLayout>
        <Outlet />
      </CustomLayout>
    </MuiProvider>
  );
};
