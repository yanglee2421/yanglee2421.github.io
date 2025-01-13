import NProgress from "nprogress";
import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  NavLink,
  Outlet,
  RouteObject,
  RouterProvider,
  ScrollRestoration,
  useLocation,
  useNavigation,
  useParams,
} from "react-router";
import { useTranslation } from "react-i18next";
import {
  alpha,
  Box,
  CircularProgress,
  Icon,
  IconButton,
  Link,
  styled,
  Typography,
} from "@mui/material";
import {
  CalculateOutlined,
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  ChatOutlined,
  ChevronRightOutlined,
  DashboardOutlined,
  GitHub,
  PeopleOutlineOutlined,
  ScienceOutlined,
  SportsEsportsOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";
import { MuiProvider } from "@/components/mui";
import { Materio } from "@/components/svg/Materio";
import { LangToggle } from "@/components/shared/LangToggle";
import { UserDropdown } from "@/components/shared/UserDropdonw";
import { ModeToggle } from "@/components/shared/ModeToggle";
import * as conf from "@/lib/conf";
import { NavigateToLogin } from "@/components/navigate";

const LANGS = new Set(["en", "zh"]);
const FALLBACK_LANG = "en";
const getMatchedLang = (path = "", state: string) => {
  if (LANGS.has(path)) {
    return path;
  }

  if (LANGS.has(state)) {
    return state;
  }

  return FALLBACK_LANG;
};

export const LangWrapper = (props: React.PropsWithChildren) => {
  const params = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const setStoreLang = useLocaleStore((s) => s.update);
  const storeLang = useLocaleStore((s) => s.fallbackLang);
  const matchedLang = getMatchedLang(params.lang, storeLang);

  React.useEffect(() => {
    setStoreLang({ fallbackLang: matchedLang });
    i18n.changeLanguage(matchedLang);
  }, [setStoreLang, matchedLang, i18n]);

  if (matchedLang !== params.lang) {
    return (
      <Navigate
        to={{
          pathname: `/${matchedLang + location.pathname}`,
          search: location.search,
          hash: location.hash,
        }}
        state={location.state}
        replace
      />
    );
  }

  return props.children;
};

const fallback = (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 6,

      position: "fixed",
      inset: 0,
      zIndex(theme) {
        return theme.zIndex.modal;
      },
    }}
  >
    <CircularProgress />
    <Typography>Loading...</Typography>
  </Box>
);

export const RootOutlet = () => {
  return (
    <LangWrapper>
      <Outlet />
    </LangWrapper>
  );
};

export const RootRoute = () => {
  const navigation = useNavigation();
  const hasHydrated = React.useSyncExternalStore(
    (onStoreChange) => useLocaleStore.persist.onFinishHydration(onStoreChange),
    () => useLocaleStore.persist.hasHydrated(),
    () => false,
  );

  React.useEffect(() => {
    switch (navigation.state) {
      case "submitting":
      case "loading":
        NProgress.start();
        break;
      case "idle":
      default:
        NProgress.done();
    }
  }, [navigation.state]);

  if (!hasHydrated) {
    return fallback;
  }

  return (
    <React.Suspense
      fallback={fallback}
    >
      <MuiProvider>
        <RootOutlet />
      </MuiProvider>
      <ScrollRestoration />
    </React.Suspense>
  );
};

const FULL_YEAR = new Date().getFullYear();

const logo = (
  <>
    <Icon
      fontSize="large"
      color="primary"
    >
      <Materio fontSize="inherit" />
    </Icon>
    <Typography
      component={"span"}
      variant="h6"
      sx={{
        fontSize: (t) => t.spacing(5),
        fontWeight: 600,
        textTransform: "uppercase",
        color: (t) => t.palette.text.primary,
      }}
    >
      github io
    </Typography>
  </>
);

const header = (
  <>
    <Box sx={{ marginInlineStart: "auto" }}></Box>
    <LangToggle />
    <ModeToggle />
    <IconButton href={conf.GITHUB_URL} target={conf.GITHUB_URL}>
      <GitHub />
    </IconButton>
    <UserDropdown />
  </>
);

const footer = (
  <>
    &copy; {FULL_YEAR} by{" "}
    <Link href={conf.GITHUB_URL} target={conf.GITHUB_URL}>
      yanglee2421
    </Link>
  </>
);

const list = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    to: "/calendar",
    label: "Calendar",
    icon: <CalendarTodayOutlined />,
  },
  {
    to: "/calculator",
    label: "Calculator",
    icon: <CalculateOutlined />,
  },
  {
    to: "/invoices",
    label: "Invoices",
    icon: <WalletOutlined />,
  },
  {
    to: "/staff",
    label: "Staff",
    icon: <PeopleOutlineOutlined />,
  },
  {
    to: "/overtime",
    label: "Overtime",
    icon: <CalendarMonthOutlined />,
  },
  {
    to: "/minesweeper",
    label: "Minesweeper",
    icon: <SportsEsportsOutlined />,
  },
  { to: "/chat", label: "Chat", icon: <ChatOutlined /> },
  {
    to: "/lab",
    label: "Lab",
    icon: <ScienceOutlined />,
  },
];

const LinkWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),

  "& a": {
    textDecoration: "none",
    color: theme.palette.text.primary,

    display: "flex",
    gap: theme.spacing(3),
    alignItem: "center",

    padding: theme.spacing(5),

    [theme.breakpoints.up("sm")]: {
      paddingInline: theme.spacing(3),
      paddingBlock: theme.spacing(3),
    },
  },
  "& a:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& a[aria-current=page]": {
    color: theme.palette.primary.main,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.activatedOpacity,
    ),
  },
}));

export const NavMenu = () => {
  const params = useParams();

  return (
    <LinkWrapper>
      {list.map((i) => (
        <NavLink key={i.to} to={`/${params.lang + i.to}`} end>
          {i.icon}
          <Typography variant="body1" component="span">
            {i.label}
          </Typography>
          <ChevronRightOutlined sx={{ marginInlineStart: "auto" }} />
        </NavLink>
      ))}
    </LinkWrapper>
  );
};

const routes: RouteObject[] = [{
  id: "root",
  path: ":lang?",
  Component: RootRoute,
  children: [
    {
      id: "404",
      path: "*",
      lazy() {
        return import("@/pages/not-fount/route");
      },
    },
    {
      id: "guest_layout",
      async lazy() {
        const [{ GuestLayout }, { NavigateToHome }, { useCurrentUser }] =
          await Promise.all([
            import("@/components/layout"),
            import("@/components/navigate"),
            import("@/hooks/firebase/useCurrentUser"),
          ]);

        return {
          Component() {
            return useCurrentUser() ? <NavigateToHome /> : (
              <GuestLayout>
                <Outlet />
              </GuestLayout>
            );
          },
        };
      },

      children: [
        {
          id: "login",
          path: "login",
          lazy: () => import("@/pages/login/route"),
        },
      ],
    },
    {
      id: "auth_layout",
      async lazy() {
        const { AuthLayout, ParticlesUI } = await import("@/components/layout");

        return {
          Component() {
            const [key, update] = React.useState("");

            const location = useLocation();
            const showMenuInMobile = Object.is(key, location.key);

            return (
              <AuthLayout
                aside={<NavMenu />}
                header={header}
                footer={footer}
                logo={logo}
                showMenuInMobile={showMenuInMobile}
                onShowMenuInMobileChange={() => {
                  update((prev) => prev === location.key ? "" : location.key);
                }}
              >
                <ParticlesUI preset="bubbles" />
                <Outlet />
              </AuthLayout>
            );
          },
        };
      },

      children: [
        {
          id: "home",
          index: true,
          lazy: () => import("@/pages/home/route"),
        },
        {
          id: "dashboard",
          path: "dashboard",
          lazy: () => import("@/pages/dashboard/route"),
        },
        {
          id: "overtime",
          path: "overtime",
          lazy: async () => {
            const [{ Component, ...rest }, { useCurrentUser }] = await Promise
              .all([
                import("@/pages/overtime/route"),
                import("@/hooks/firebase/useCurrentUser"),
              ]);

            return {
              ...rest,
              Component() {
                return useCurrentUser() ? <Component /> : <NavigateToLogin />;
              },
            };
          },
        },
        {
          id: "minesweeper",
          path: "minesweeper",
          lazy: () => import("@/pages/minesweeper/route"),
        },
        {
          id: "lab",
          path: "lab",
          lazy: () => import("@/pages/lab/route"),
        },
        {
          id: "calendar",
          path: "calendar",
          lazy: () => import("@/pages/calendar/Component"),
        },
        {
          id: "calculator",
          path: "calculator",
          lazy: () => import("@/pages/calculator/route"),
        },
        {
          id: "invoices",
          path: "invoices",
          lazy: () => import("@/pages/invoices/route"),
        },
        {
          id: "staff",
          path: "staff",
          lazy: () => import("@/pages/staff/route"),
        },
        { id: "chat", path: "chat", lazy: () => import("@/pages/chat/route") },
      ],
    },
  ],
}];

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes);

export const RouterUI = () => <RouterProvider router={router} />;
