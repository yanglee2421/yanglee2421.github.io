import { Logo as AppLogo } from "@/components/Logo";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import * as consts from "@/lib/constants";
import {
  ChevronRightOutlined,
  CloseOutlined,
  DashboardOutlined,
  GitHub,
  MenuOutlined,
} from "@mui/icons-material";
import {
  alpha,
  AppBar,
  Box,
  IconButton,
  Link as MuiLink,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router";
import { ScrollView } from "../scrollbar";
import { LangToggle } from "../shared/LangToggle";
import { ModeToggle } from "../shared/ModeToggle";
import { UserDropdown } from "../shared/UserDropdonw";

const LinkWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),

  "& a": {
    textDecoration: "none",
    color: theme.palette.text.primary,

    display: "flex",
    gap: theme.spacing(1.5),
    alignItem: "center",

    padding: theme.spacing(2.5),

    [theme.breakpoints.up("sm")]: {
      paddingInline: theme.spacing(1.5),
      paddingBlock: theme.spacing(1.5),
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
    to: "/dnd/basic-setup",
    label: "basic setup",
    icon: <DashboardOutlined />,
  },
];

export const NavMenu = () => {
  const params = useParams();
  const fallbackLang = useLocalStore((store) => store.fallbackLang);
  const lang = params.lang || fallbackLang;

  return (
    <LinkWrapper>
      {list.map((i) => (
        <NavLink key={i.to} to={`/${lang + i.to}`} end>
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
  blockSize: "100dvh",
  [theme.breakpoints.down("sm")]: {
    "&:where([data-showmenu=false]) [role=menu]": {
      display: "none",
    },
    "&:where([data-showmenu=true]) [role=main]": {
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
    inlineSize: "100dvw",
    blockSize: "100dvh",
  },
}));

const AuthMain = styled("main")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  inlineSize: "100%",
  minBlockSize: 0,
  padding: theme.spacing(2),
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

export const AuthLayout = () => {
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
              gap: 1,
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
      <ScrollView>
        <AuthAsideWrapper role="menu">
          <AuthAside>
            <ScrollView>
              <NavMenu />
            </ScrollView>
          </AuthAside>
        </AuthAsideWrapper>
        <AuthContentWrapper role="main">
          <AuthMain>
            <Outlet />
          </AuthMain>
        </AuthContentWrapper>
      </ScrollView>
    </AuthLayoutWrapper>
  );
};
