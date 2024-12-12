import {
  alpha,
  AppBar,
  Box,
  ButtonBase,
  Icon,
  IconButton,
  Link,
  styled,
  Toolbar,
} from "@mui/material";
import { Link as RouterLink, Outlet, useLocation } from "react-router";
import { ModeToggle } from "../shared/ModeToggle";
import { LangToggle } from "../shared/LangToggle";
import { CloseOutlined, GitHub, MenuOutlined } from "@mui/icons-material";
import { UserDropdown } from "../shared/UserDropdonw";
import React from "react";
import { Materio } from "../svg/Materio";

const github_url = import.meta.env.VITE_GITHUB_URL;
const ASIDE_SIZE = 64;

export function Component() {
  const location = useLocation();

  return (
    <AuthLayout key={location.pathname} navMenu={<NavMenu />}>
      <Outlet />
    </AuthLayout>
  );
}

function NavMenu() {
  return (
    <>
      <ButtonBase
        component={RouterLink}
        to="/"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.body1.fontSize,
        })}
      >
        Home
      </ButtonBase>
      <ButtonBase
        component={RouterLink}
        to="/dashboard"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.body1.fontSize,
        })}
      >
        dashboard
      </ButtonBase>
      <ButtonBase
        component={RouterLink}
        to="/overtime"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.body1.fontSize,
        })}
      >
        overtime
      </ButtonBase>
      <ButtonBase
        component={RouterLink}
        to="/minesweeper"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.body1.fontSize,
        })}
      >
        minesweeper
      </ButtonBase>
      <ButtonBase
        component={RouterLink}
        to="/lab"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.body1.fontSize,
        })}
      >
        lab
      </ButtonBase>
      <ButtonBase
        component={RouterLink}
        to="/calendar"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.body1.fontSize,
        })}
      >
        calendar
      </ButtonBase>
      <Box height={1000}></Box>
    </>
  );
}

type Props = React.PropsWithChildren<{
  navMenu?: React.ReactNode;
}>;

function AuthLayout(props: Props) {
  const [showMenuInMobile, update] = React.useState(false);

  return (
    <>
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
          <Icon
            component={RouterLink}
            to="/"
            fontSize="large"
            color="primary"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Materio fontSize="inherit" />
          </Icon>
          <IconButton
            onClick={() => update((p) => !p)}
            sx={{ display: { sm: "none" } }}
          >
            {showMenuInMobile ? <CloseOutlined /> : <MenuOutlined />}
          </IconButton>
          <Box sx={{ marginInlineStart: "auto" }}></Box>
          <LangToggle />
          <ModeToggle />
          <IconButton href={github_url} target={github_url}>
            <GitHub />
          </IconButton>
          <UserDropdown />
        </Toolbar>
      </AppBar>
      <Aside sx={{ maxInlineSize: showMenuInMobile ? "none" : 0 }}>
        <Nav>{props.navMenu}</Nav>
      </Aside>
      <MainWrapper sx={{ display: showMenuInMobile ? "none" : "flex" }}>
        <Main>{props.children}</Main>
        <Footer>
          &copy;2024 by{" "}
          <Link href={github_url} target={github_url}>
            yanglee2421
          </Link>
        </Footer>
      </MainWrapper>
    </>
  );
}

const Aside = styled("aside")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.appBar - 1,

  inlineSize: "100dvw",
  blockSize: "100dvh",
  paddingBlockStart: theme.spacing(14),

  [theme.breakpoints.up("sm")]: {
    maxInlineSize: theme.spacing(ASIDE_SIZE),
    paddingBlockStart: theme.spacing(16),
  },

  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
}));

const Nav = styled("nav")(({ theme }) => ({
  maxBlockSize: "100%",

  overflow: "auto",
  borderInlineEnd: `1px solid ${theme.palette.divider}`,
}));

const MainWrapper = styled("div")(({ theme }) => ({
  display: "none",
  flexDirection: "column",

  minBlockSize: "100dvh",
  paddingBlockStart: theme.spacing(14),

  [theme.breakpoints.up("sm")]: {
    display: "flex",
    paddingInlineStart: theme.spacing(ASIDE_SIZE),
    paddingBlockStart: theme.spacing(16),
  },
}));

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,

  padding: theme.spacing(3),
  paddingBlockEnd: theme.spacing(0),
}));

const Footer = styled("footer")(({ theme }) => ({
  padding: theme.spacing(3),
}));
