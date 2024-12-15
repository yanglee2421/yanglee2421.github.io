import {
  alpha,
  AppBar,
  Box,
  Icon,
  IconButton,
  Link,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, NavLink, useParams } from "react-router";
import { ModeToggle } from "../shared/ModeToggle";
import { LangToggle } from "../shared/LangToggle";
import {
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  ChevronRightOutlined,
  CloseOutlined,
  DashboardOutlined,
  GitHub,
  MenuOutlined,
  ScienceOutlined,
  SportsEsportsOutlined,
} from "@mui/icons-material";
import { UserDropdown } from "../shared/UserDropdonw";
import React from "react";
import { Materio } from "../svg/Materio";

const github_url = import.meta.env.VITE_GITHUB_URL;
const ASIDE_SIZE = 72;

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
    icon: <DashboardOutlined color="inherit" />,
  },
  {
    to: "/calendar",
    label: "Calendar",
    icon: <CalendarTodayOutlined />,
  },
  { to: "/overtime", label: "Overtime", icon: <CalendarMonthOutlined /> },
  {
    to: "/minesweeper",
    label: "Minesweeper",
    icon: <SportsEsportsOutlined />,
  },
  {
    to: "/lab",
    label: "Lab",
    icon: <ScienceOutlined />,
  },
];

function NavMenu() {
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
}

type Props = React.PropsWithChildren;

export const AuthLayout = (props: Props) => {
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
        <Nav>
          <NavMenu />
        </Nav>
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
};

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
  blockSize: "100%",

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
