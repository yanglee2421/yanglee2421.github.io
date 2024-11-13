import {
  alpha,
  Box,
  ButtonBase,
  IconButton,
  Link,
  styled,
} from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ModeToggle } from "../shared/ModeToggle";
import { LangToggle } from "../shared/LangToggle";
import { CloseOutlined, GitHub, MenuOutlined } from "@mui/icons-material";
import { AuthGuard } from "@/components/guard/AuthGuard";
import { UserDropdown } from "../shared/UserDropdonw";
import React from "react";

const github_url = import.meta.env.VITE_GITHUB_URL;
const HEADER_SIZE = 14;
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
        component={NavLink}
        to="/"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.h6.fontSize,
        })}
      >
        Home
      </ButtonBase>
      <ButtonBase
        component={NavLink}
        to="/dashboard"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.h6.fontSize,
        })}
      >
        dashboard
      </ButtonBase>
      <ButtonBase
        component={NavLink}
        to="/overtime"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.h6.fontSize,
        })}
      >
        overtime
      </ButtonBase>
      <ButtonBase
        component={NavLink}
        to="/minesweeper"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.h6.fontSize,
        })}
      >
        minesweeper
      </ButtonBase>
      <ButtonBase
        component={NavLink}
        to="/lab"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.h6.fontSize,
        })}
      >
        lab
      </ButtonBase>
      <ButtonBase
        component={NavLink}
        to="/calendar"
        sx={(t) => ({
          display: "block",
          inlineSize: "100%",
          paddingInline: 5,
          paddingBlock: 2,
          fontSize: t.typography.h6.fontSize,
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
    <AuthGuard>
      <Header>
        <GitHub sx={{ display: { xs: "none", md: "unset" } }} />
        <IconButton
          onClick={() => update((p) => !p)}
          sx={{ display: { md: "none" } }}
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
      </Header>
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
    </AuthGuard>
  );
}

const Header = styled("header")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.appBar,

  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  inlineSize: "100%",
  blockSize: theme.spacing(HEADER_SIZE),
  paddingInline: theme.spacing(5),
  paddingBlock: theme.spacing(2),
  borderBlockEnd: `1px ${theme.palette.divider} solid`,

  backgroundColor: alpha(theme.palette.background.default, 0.6),
  backdropFilter: "blur(8px)",
}));

const Aside = styled("aside")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.appBar - 1,

  inlineSize: "100dvw",
  blockSize: "100dvh",
  paddingBlockStart: theme.spacing(HEADER_SIZE),

  [theme.breakpoints.up("md")]: {
    maxInlineSize: theme.spacing(ASIDE_SIZE),
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
  paddingBlockStart: theme.spacing(HEADER_SIZE),

  [theme.breakpoints.up("md")]: {
    display: "flex",
    paddingInlineStart: theme.spacing(ASIDE_SIZE),
  },
}));

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,

  paddingInline: theme.spacing(5),
  paddingBlock: theme.spacing(2),
}));

const Footer = styled("footer")(({ theme }) => ({
  paddingInline: theme.spacing(5),
  paddingBlock: theme.spacing(2),
}));
