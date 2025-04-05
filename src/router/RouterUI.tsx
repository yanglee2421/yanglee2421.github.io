import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  ScrollRestoration,
  useLocation,
  useParams,
  useNavigation,
  Link,
  useRouteError,
  isRouteErrorResponse,
  useSearchParams,
  NavLink,
} from "react-router";
import {
  Alert,
  AlertTitle,
  alpha,
  AppBar,
  Box,
  Button,
  GlobalStyles,
  IconButton,
  styled,
  Toolbar,
  Typography,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import {
  CalculateOutlined,
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  ChatOutlined,
  ChevronRightOutlined,
  CloseOutlined,
  DashboardOutlined,
  GitHub,
  HandshakeOutlined,
  HomeOutlined,
  MenuOutlined,
  PeopleOutlineOutlined,
  QrCodeOutlined,
  ScienceOutlined,
  SportsEsportsOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import NProgress from "nprogress";
import { useTranslation } from "react-i18next";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { getMatchedLang } from "@/lib/utils";
import { HOME_PATH, LOGIN_PATH } from "@/lib/constants";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import { loadBubblesPreset } from "@tsparticles/preset-bubbles";
import { UserDropdown } from "@/components/shared/UserDropdonw";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { LangToggle } from "@/components/shared/LangToggle";
import { Logo as AppLogo } from "@/components/Logo";
import * as consts from "@/lib/constants";

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
  {
    to: "/qrcode",
    label: "qrcode",
    icon: <QrCodeOutlined />,
  },
  { to: "/chat", label: "Chat", icon: <ChatOutlined /> },
  {
    to: "/lab",
    label: "Lab",
    icon: <ScienceOutlined />,
  },
  {
    to: "/handbook",
    label: "Handbook",
    icon: <HandshakeOutlined />,
  },
];

const NavMenu = () => {
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

NavMenu.list = list;

const AuthLayoutWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "&:where([data-showmenu=false]) > [role=menu]": {
      display: "none",
    },
    "&:where([data-showmenu=true]) > [role=main]": {
      display: "none",
    },
  },
}));

const AuthAsideWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.appBar - 1,
  insetInlineStart: 0,
  insetBlockStart: 0,
  inlineSize: "100dvw",
  blockSize: "100dvh",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  paddingBlockStart: theme.spacing(consts.HEADER_SIZE_XS),
  [theme.breakpoints.up("sm")]: {
    maxInlineSize: theme.spacing(consts.ASIDE_SIZE),
    paddingBlockStart: theme.spacing(consts.HEADER_SIZE_SM),
  },
}));

const AuthAside = styled("aside")(({ theme }) => ({
  inlineSize: "100%",
  blockSize: "100%",
  overflowX: "visible",
  overflowY: "auto",
  borderInlineEnd: `1px solid ${theme.palette.divider}`,
}));

const AuthContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minBlockSize: "100dvh",
  paddingBlockStart: theme.spacing(consts.HEADER_SIZE_XS),
  [theme.breakpoints.up("sm")]: {
    paddingInlineStart: theme.spacing(consts.ASIDE_SIZE),
    paddingBlockStart: theme.spacing(consts.HEADER_SIZE_SM),
  },
  "&:has([data-contentfixed=true])": {
    blockSize: "100dvh",
  },
}));

const AuthMain = styled("main")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  inlineSize: "100%",
  minBlockSize: 0,
  padding: theme.spacing(4),
  "&:has([data-contentfixed=true])": {
    blockSize: "100%",
  },
}));

const AuthHeader = () => {
  return (
    <>
      <Box sx={{ marginInlineStart: "auto" }}></Box>
      <LangToggle />
      <ModeToggle />
      <IconButton href={consts.GITHUB_URL} target={consts.GITHUB_URL}>
        <GitHub />
      </IconButton>
      <UserDropdown />
    </>
  );
};

export const AuthFooter = () => {
  return (
    <>
      &copy;{consts.FULL_YEAR} by{" "}
      <MuiLink href={consts.GITHUB_URL} target={consts.GITHUB_URL}>
        yanglee2421
      </MuiLink>
    </>
  );
};

const AuthLayout = () => {
  const [key, update] = React.useState("");

  const location = useLocation();
  const showMenuInMobile = Object.is(key, location.key);

  return (
    <AuthLayoutWrapper data-showmenu={showMenuInMobile}>
      <AppBar
        elevation={0}
        sx={(theme) => ({
          bgcolor: "transparent",
          borderBlockEnd: `1px solid ${theme.palette.divider}`,
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          backdropFilter: "blur(8px)",
        })}
      >
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 2.5,
              alignItems: "flex-end",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <AppLogo />
          </Box>

          <IconButton
            onClick={() => update((prev) => (prev ? "" : location.key))}
            sx={{ display: { sm: "none" } }}
          >
            {showMenuInMobile ? <CloseOutlined /> : <MenuOutlined />}
          </IconButton>

          <AuthHeader />
        </Toolbar>
      </AppBar>
      <AuthAsideWrapper role="menu">
        <AuthAside>
          <NavMenu />
        </AuthAside>
      </AuthAsideWrapper>
      <AuthContentWrapper role="main">
        <AuthMain>
          <Outlet />
        </AuthMain>
      </AuthContentWrapper>
    </AuthLayoutWrapper>
  );
};

const BlankLayout = () => {
  return (
    <Box
      sx={{
        padding: 6,
        backgroundColor(t) {
          return t.palette.grey[300];
        },
      }}
    >
      <Outlet />
    </Box>
  );
};

const IMAGE_SIZE = 1024;
const ICON_SIZE = (IMAGE_SIZE * 1) / 2;
const MAIN_SIZE = 120;

const GuestAside = styled("aside")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.appBar - 1,
  inset: 0,

  inlineSize: "100dvw",
  blockSize: "100dvh",

  [theme.breakpoints.up("sm")]: {
    paddingInlineEnd: theme.spacing(MAIN_SIZE),
  },
}));

const GuestMain = styled("main")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.appBar,
  insetInlineEnd: 0,
  insetBlock: 0,

  inlineSize: "100dvw",
  blockSize: "100dvh",

  backgroundColor: alpha(theme.palette.background.default, 0.95),
  backdropFilter: "blur(8px)",

  [theme.breakpoints.up("sm")]: {
    maxInlineSize: theme.spacing(MAIN_SIZE),

    borderInlineStart: `1px solid ${theme.palette.divider}`,
  },
}));

const Logo = (props: React.SVGProps<SVGSVGElement> & { bgcolor: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill={props.bgcolor} />
      <circle cx="12" cy="12" r="1" fill="#FFFFFF" />
      <ellipse
        cx="12"
        cy="12"
        rx="4"
        ry="10"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        transform="rotate(45 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="4"
        ry="10"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        transform="rotate(-45 12 12)"
      />
    </svg>
  );
};

const GuestLayout = () => {
  const id = React.useId();
  const cvsRef = React.useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  React.useEffect(() => {
    const svg = document.getElementById(id);

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image(ICON_SIZE, ICON_SIZE);
    img.src = url;
    img.onload = () => {
      URL.revokeObjectURL(url);
      const cvs = cvsRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;

      cvs.width = IMAGE_SIZE;
      cvs.height = IMAGE_SIZE;
      ctx.fillStyle = theme.palette.primary.main;
      ctx.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);
      ctx.drawImage(
        img,
        0,
        0,
        IMAGE_SIZE,
        IMAGE_SIZE,
        IMAGE_SIZE / 2 - ICON_SIZE / 2,
        IMAGE_SIZE / 2 - ICON_SIZE / 2,
        IMAGE_SIZE,
        IMAGE_SIZE,
      );

      img.remove();
    };
    document.body.append(img);
  }, [id, theme.palette.primary.main]);

  return (
    <>
      <GuestAside>
        {
          void (
            <>
              <Logo
                id={id}
                width={ICON_SIZE}
                height={ICON_SIZE}
                bgcolor={theme.palette.primary.main}
                display={"none"}
              />
              <Box
                display={"flex"}
                border="1px red dash"
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
              >
                <canvas
                  ref={cvsRef}
                  width={IMAGE_SIZE}
                  height={IMAGE_SIZE}
                ></canvas>
              </Box>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.download = "icon.png";
                  link.href = cvsRef.current?.toDataURL("image/png", 1) || "";
                  link.click();
                  link.remove();
                }}
              >
                export
              </button>
            </>
          )
        }
      </GuestAside>
      <GuestMain>
        <Outlet />
      </GuestMain>
    </>
  );
};

const useNprogress = () => {
  const navigation = useNavigation();

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
};

const NprogressBar = () => {
  useNprogress();
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "#nprogress": {
          position: "fixed",
          top: 0,
          inlineSize: "100dvw",

          zIndex: theme.zIndex.drawer + 1,
        },
        "#nprogress .bar": {
          backgroundColor: theme.palette.primary.main,
          blockSize: theme.spacing(1),
        },
      }}
    />
  );
};

const snowPro = initParticlesEngine(async (engine) => {
  await loadBubblesPreset(engine);
  await loadBigCirclesPreset(engine);
  await loadSlim(engine);
});

type ParticlesUIProps = {
  preset: string;
};

const ParticlesUI = (props: ParticlesUIProps) => {
  React.use(snowPro);

  return (
    <Particles
      options={{
        preset: props.preset,
        background: { opacity: 0 },
      }}
    />
  );
};

const RootRoute = () => {
  return (
    <>
      <ParticlesUI preset="bubbles" />
      <NprogressBar />
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

const renderError = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>{error.status}</AlertTitle>
        <Typography>{error.statusText}</Typography>
        <Link to="/">
          <Button startIcon={<HomeOutlined />}>返回首页</Button>
        </Link>
      </Alert>
    );
  }

  if (error instanceof Error) {
    return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>错误</AlertTitle>
        <Typography>{error.message}</Typography>
        <Typography variant="body2">{error.stack}</Typography>
        <Link to="/">
          <Button startIcon={<HomeOutlined />} color="error">
            返回首页
          </Button>
        </Link>
      </Alert>
    );
  }

  return (
    <Alert severity="error" variant="outlined">
      <AlertTitle>错误</AlertTitle>
      <Typography>未知错误，请联系服务人员</Typography>
      <Link to="/">
        <Button startIcon={<HomeOutlined />} color="error">
          返回首页
        </Button>
      </Link>
    </Alert>
  );
};

const RootErrorBoundary = () => {
  const error = useRouteError();

  return <Box sx={{ padding: 6 }}>{renderError(error)}</Box>;
};

const LangGuard = () => {
  const params = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const setStoreLang = useLocalStore((s) => s.update);
  const storeLang = useLocalStore((s) => s.fallbackLang);
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

  return <Outlet />;
};

const NavigateToHome = () => {
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  search.delete("redirect_uri");

  return (
    <Navigate
      to={{
        pathname: searchParams.get("redirect_uri") || HOME_PATH,
        search: search.toString(),
      }}
      replace
    />
  );
};

const NavigateToLogin = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  search.set("redirect_uri", location.pathname);

  return (
    <Navigate
      to={{
        pathname: LOGIN_PATH,
        search: search.toString(),
      }}
      replace
    />
  );
};

const AuthGuard = () => (useCurrentUser() ? <Outlet /> : <NavigateToLogin />);
const GuestGuard = () => (useCurrentUser() ? <NavigateToHome /> : <Outlet />);

const routes: RouteObject[] = [
  {
    id: "root",
    Component: RootRoute,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        id: "lang",
        path: ":lang?",
        Component: LangGuard,
        children: [
          {
            id: "404",
            path: "*",
            lazy() {
              return import("@/pages/not-fount/route");
            },
          },
          {
            id: "guest_guard",
            Component: GuestGuard,
            children: [
              {
                id: "guest_layout",
                Component: GuestLayout,
                children: [
                  {
                    id: "login",
                    path: "login",
                    lazy: () => import("@/pages/login/route"),
                  },
                ],
              },
            ],
          },
          {
            id: "auth_guard",
            Component: AuthGuard,
            children: [
              {
                id: "auth_layout",
                Component: AuthLayout,
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
                    lazy: async () => import("@/pages/overtime/route"),
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
                  {
                    id: "chat",
                    path: "chat",
                    lazy: () => import("@/pages/chat/route"),
                  },
                  {
                    id: "handbook",
                    path: "handbook",
                    lazy: () => import("@/pages/handbook/component"),
                  },
                  {
                    id: "qrcode",
                    path: "qrcode",
                    lazy: () => import("@/pages/qrcode/route"),
                  },
                ],
              },
            ],
          },
          {
            id: "blank_layout",
            Component: BlankLayout,
            children: [],
          },
        ],
      },
    ],
  },
];

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes);

export const RouterUI = () => <RouterProvider router={router} />;
