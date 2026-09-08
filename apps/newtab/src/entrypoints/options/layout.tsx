import {
  FormatQuote,
  Image,
  KeyboardArrowLeft,
  KeyboardCommandKey,
  Menu,
  MenuOpen,
  MoreVert,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import {
  Link,
  Outlet,
  ScrollRestoration,
  useLocation,
  useParams,
} from "react-router";

const StyledLink = styled(Link)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",

    gap: theme.spacing(1),

    color: theme.palette.primary.main,
  };
});

export const MuiLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <ScrollRestoration />
    </>
  );
};

const Layout = (props: React.PropsWithChildren) => {
  const [showSidebarDownSmall, setShowSidebarDownSmall] = React.useState(false);
  const [showSidebarUpSmall, setShowSidebarUpSmall] = React.useState(true);
  const [headerDivider, setHeaderDivider] = React.useState(false);

  const scrollCursorRef = React.useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const params = useParams();
  const location = useLocation();
  const isDownSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const showSidebar = isDownSmall ? showSidebarDownSmall : showSidebarUpSmall;

  React.useEffect(() => {
    const el = scrollCursorRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setHeaderDivider(entry.isIntersecting);
    });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  return (
    <Box sx={{ "--sidebar-width": theme.spacing(36) }}>
      <Paper
        aria-hidden={!showSidebar}
        sx={{
          position: "fixed",
          insetBlockStart: 0,
          zIndex: theme.zIndex.drawer,

          blockSize: "100dvh",

          borderRadius: 0,

          display: "flex",
          flexDirection: "column",

          [theme.breakpoints.between("xs", "sm")]: {
            inlineSize: "100%",

            [`&:where([aria-hidden=true])`]: {
              insetInlineStart: `-100%`,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
            [`&:where([aria-hidden=false])`]: {
              insetInlineStart: 0,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
          },

          [theme.breakpoints.up("sm")]: {
            inlineSize: "var(--sidebar-width)",

            [`&:where([aria-hidden=true])`]: {
              insetInlineStart: `calc(-1 * var(--sidebar-width))`,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
            [`&:where([aria-hidden=false])`]: {
              insetInlineStart: 0,
              transition: theme.transitions.create("inset-inline-start", {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
          },
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <StyledLink to={{ pathname: "/" }}>
            <KeyboardCommandKey />
            <Typography variant="h6">Newtab</Typography>
          </StyledLink>
          <Box sx={{ mx: "auto" }}></Box>
          <IconButton
            onClick={() => {
              setShowSidebarDownSmall((p) => !p);
            }}
            sx={{
              display: { sm: "none" },
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <Box
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            minBlockSize: 0,
            overflow: "auto",
          }}
        >
          <List
            subheader={
              <ListSubheader
                disableSticky
                sx={{ backgroundColor: "transparent" }}
              >
                Normal
              </ListSubheader>
            }
          >
            <ListItemButton
              component={Link}
              to={{ pathname: `/${params.lang}` }}
              selected={Object.is(location.pathname, `/${params.lang}`)}
            >
              <ListItemIcon>
                <Image />
              </ListItemIcon>
              <ListItemText primary={"背景设置"} />
            </ListItemButton>
          </List>
          <List
            subheader={
              <ListSubheader
                disableSticky
                sx={{ backgroundColor: "transparent" }}
              >
                Else
              </ListSubheader>
            }
          >
            <ListItemButton
              component={Link}
              to={{ pathname: `/${params.lang}/quotes` }}
              selected={Object.is(location.pathname, `/${params.lang}/quotes`)}
            >
              <ListItemIcon>
                <FormatQuote />
              </ListItemIcon>
              <ListItemText primary={"每日一言"} />
            </ListItemButton>
          </List>
        </Box>
        <Divider />
        <Toolbar sx={{ gap: 1 }}>
          <Avatar></Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Newtab</Typography>
            <Typography variant="body2" color="textSecondary">
              3182703224@qq.com
            </Typography>
          </Box>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Toolbar>
      </Paper>
      <Box
        sx={{
          minBlockSize: "100dvh",

          flexDirection: "column",

          [theme.breakpoints.between("xs", "sm")]: {
            [`[aria-hidden=true] + &`]: {
              display: "flex",
            },
            [`[aria-hidden=false] + &`]: {
              display: "none",
            },
          },

          [theme.breakpoints.up("sm")]: {
            display: "flex",

            [`[aria-hidden=false] + &`]: {
              paddingInlineStart: `var(--sidebar-width)`,
              transition: theme.transitions.create("padding-inline-start", {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
            [`[aria-hidden=true] + &`]: {
              paddingInlineStart: 0,
              transition: theme.transitions.create("padding-inline-start", {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
              }),
            },
          },
        }}
      >
        <Toolbar
          sx={{
            position: "sticky",
            zIndex: theme.zIndex.appBar,
            insetBlockStart: 0,

            backgroundColor: theme.palette.background.default,

            boxShadow: headerDivider ? theme.shadows[0] : theme.shadows[1],
            transition: theme.transitions.create("box-shadow"),
          }}
        >
          <IconButton
            onClick={() => {
              if (isDownSmall) {
                setShowSidebarDownSmall((p) => !p);
              } else {
                setShowSidebarUpSmall((p) => !p);
              }
            }}
          >
            {showSidebarUpSmall ? <MenuOpen /> : <Menu />}
          </IconButton>
          <Box sx={{ mx: "auto" }}></Box>
          <ModeToggle />
        </Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 0,

            display: "flex",
            flexDirection: "column",
          }}
        >
          <div ref={scrollCursorRef} />
          <Container
            sx={{
              flexGrow: 1,
              flexShrink: 0,
              flexBasis: 0,

              display: "flex",
              flexDirection: "column",
            }}
          >
            {props.children}
            <Box sx={{ py: 1, marginBlockStart: "auto" }}>
              <Typography variant="overline" color="textSecondary">
                Copyright © 2026 Material UI SAS, trading as MUI.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
