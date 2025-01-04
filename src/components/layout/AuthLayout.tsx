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
import {
  CalculateOutlined,
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  ChatOutlined,
  ChevronRightOutlined,
  CloseOutlined,
  DashboardOutlined,
  GitHub,
  MenuOutlined,
  PeopleOutlineOutlined,
  ScienceOutlined,
  SportsEsportsOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import { Link as RouterLink, NavLink, useParams } from "react-router";
import React from "react";
import { LangToggle } from "../shared/LangToggle";
import { ModeToggle } from "../shared/ModeToggle";
import { UserDropdown } from "../shared/UserDropdonw";
import { Materio } from "../svg/Materio";
import * as conf from "@/lib/conf";

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
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              gap: 2.5,
              alignItems: "flex-end",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Icon
              fontSize="large"
              color="primary"
              sx={{ display: { xs: "none", sm: "block" } }}
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
              }}
            >
              github io
            </Typography>
          </Box>

          <IconButton
            onClick={() => update((p) => !p)}
            sx={{ display: { sm: "none" } }}
          >
            {showMenuInMobile ? <CloseOutlined /> : <MenuOutlined />}
          </IconButton>
          <Box sx={{ marginInlineStart: "auto" }}></Box>
          <LangToggle />
          <ModeToggle />
          <IconButton href={conf.GITHUB_URL} target={conf.GITHUB_URL}>
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
          <Link href={conf.GITHUB_URL} target={conf.GITHUB_URL}>
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
