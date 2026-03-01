import { LangToggle } from "@/components/shared/LangToggle";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { UserDropdown } from "@/components/shared/UserDropdonw";
import { DashboardLayout, PageContainer, useActivePage } from "@toolpad/core";
import { Outlet, useParams } from "react-router";

const ToolbarActions = () => {
  return (
    <>
      <LangToggle />
      <ModeToggle />
    </>
  );
};

export const DashLayout = () => {
  const activePage = useActivePage();
  const params = useParams();

  const segments =
    activePage?.path.split("/").filter((path) => {
      if (!path) return false;
      if (path === params.lang) return false;
      return true;
    }) || [];

  const renderTitle = () => {
    const segment = segments[segments.length - 1];
    if (!segment) return;

    const title = decodeURIComponent(segment);

    return [title.slice(0, 1).toLocaleUpperCase(), title.slice(1)].join("");
  };

  const renderBreadcrumbs = () => {
    if (!activePage) return;

    return segments.map((segment, idx, segments) => {
      const title = decodeURIComponent(
        [segment.slice(0, 1).toLocaleUpperCase(), segment.slice(1)].join(""),
      );

      return {
        title,
        path: Object.is(segments.length - 1, idx)
          ? void 0
          : ["", params.lang, ...segments.slice(0, idx + 1)].join("/"),
      };
    });
  };

  return (
    <DashboardLayout
      slots={{
        toolbarActions: ToolbarActions,
        toolbarAccount: UserDropdown,
      }}
    >
      <PageContainer title={renderTitle()} breadcrumbs={renderBreadcrumbs()}>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
};
