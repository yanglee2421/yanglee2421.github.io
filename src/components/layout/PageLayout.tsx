import {
  NotificationsOutlined,
  FavoriteBorderOutlined,
  SearchOutlined,
  HomeOutlined,
  Grid3x3Outlined,
  QuestionAnswerOutlined,
  CloseOutlined,
  ScienceOutlined,
} from "@mui/icons-material";
import {
  Box,
  alpha,
  Link,
  styled,
  IconButton,
  Stack,
  Typography,
  Fade,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { SwitchTransition } from "react-transition-group";
import { LanguageToggler } from "@/components/shared/LanguageToggler";
import { ModeToggler } from "@/components/shared/ModeToggler";
import { UserDropdown } from "@/components/shared/UserDropdown";
import { Materio } from "@/components/svg/Materio";
import { ScrollView } from "@/components/ui/ScrollView";
import { useIsScrolled } from "@/hooks/dom/useIsScrolled";
import { NavMenuButton } from "./NavMenuButton";
import type { Theme } from "@mui/material";

export function PageLayout(props: React.PropsWithChildren) {
  const isScrolled = useIsScrolled();

  const [showMenu, setShowMenu] = React.useState(false);

  const mediumScreen = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.up("md");
  });

  if (mediumScreen && showMenu) {
    setShowMenu(false);
  }

  return (
    <StyledAppWrapper>
      {/* Aside */}
      <StyledAside sx={{ insetInlineStart: { xs: showMenu ? 0 : "-100%" } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,

            paddingInline: 5,
            paddingBlock: 2,

            fontSize: 22,

            borderBottom(theme) {
              return "1px solid " + theme.palette.divider;
            },
          }}
        >
          <Materio width={"1.2658em"} height={"1em"} />
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
            }}
          >
            materio
          </Typography>
          <IconButton
            onClick={() => {
              setShowMenu(false);
            }}
            sx={{ display: { sm: "none" }, marginInlineStart: "auto" }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <ScrollView
            options={{ wheelPropagation: false, suppressScrollX: true }}
          >
            <Box
              height={2000}
              sx={{
                "& > * + *": {
                  marginBlockStart: 2,
                },
              }}
            >
              <StyledNavLink to={{ pathname: "/" }}>
                <HomeOutlined sx={{ marginInlineEnd: 2 }} />
                <span>Home</span>
              </StyledNavLink>
              <StyledNavLink to={{ pathname: "/table" }}>
                <Grid3x3Outlined sx={{ marginInlineEnd: 2 }} />
                <span>Table</span>
              </StyledNavLink>
              <StyledNavLink to={{ pathname: "/chat" }}>
                <QuestionAnswerOutlined sx={{ marginInlineEnd: 2 }} />
                <span>Chat</span>
              </StyledNavLink>
              <StyledNavLink to={{ pathname: "/lab" }}>
                <ScienceOutlined sx={{ marginInlineEnd: 2 }} />
                <span>Lab</span>
              </StyledNavLink>
              <Box
                sx={{
                  display: "flex",
                  gap: 2.5,
                  alignItems: "center",
                  paddingBlock: 1.5,

                  "&::before": {
                    content: '""',
                    blockSize: 1,
                    inlineSize(theme) {
                      return theme.typography.body1.fontSize;
                    },
                    backgroundColor(theme) {
                      return theme.palette.divider;
                    },
                  },

                  "&::after": {
                    content: '""',
                    blockSize: 1,
                    flexGrow: 1,
                    backgroundColor(theme) {
                      return theme.palette.divider;
                    },
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color(theme) {
                      return theme.palette.text.disabled;
                    },
                  }}
                >
                  Page Group
                </Typography>
              </Box>
              <StyledNavLink to={{ pathname: "/404" }}>404</StyledNavLink>
            </Box>
          </ScrollView>
        </Box>
      </StyledAside>

      {/* Main Wrapper */}
      <StyledMainWrapper>
        <StyledHeader
          sx={{
            px: isScrolled ? 7 : 5,

            boxShadow(theme) {
              return isScrolled ? theme.shadows[1] : void 0;
            },
            backdropFilter: isScrolled ? "blur(9px)" : void 0,
            bgcolor(theme) {
              return isScrolled
                ? alpha(theme.palette.background.paper, 0.85)
                : theme.palette.background.default;
            },
          }}
        >
          <Stack
            direction={"row"}
            spacing={3}
            useFlexGap
            sx={{
              alignItems: "center",
            }}
          >
            <NavMenuButton
              open={showMenu}
              onChange={() => {
                setShowMenu((p) => !p);
              }}
            />
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", md: "block" },
                color(theme) {
                  return theme.palette.text.disabled;
                },
                cursor: "pointer",
              }}
            >
              Seach Ctrl + K
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            spacing={3}
            useFlexGap
            sx={{
              ml: "auto",
              alignItems: "center",
            }}
          >
            <LanguageToggler />
            <ModeToggler />
            <IconButton>
              <FavoriteBorderOutlined />
            </IconButton>
            <IconButton>
              <NotificationsOutlined />
            </IconButton>
            <UserDropdown />
          </Stack>
        </StyledHeader>
        <SwitchTransition>
          <Fade key={1} unmountOnExit>
            <StyledMain>{props.children}</StyledMain>
          </Fade>
        </SwitchTransition>
        <StyledFooter>
          &copy; 2024, Made with ❤️ by{" "}
          <Link
            href="https://github.com/yanglee2421"
            target="https://github.com/yanglee2421"
            underline="hover"
          >
            YangLee2421
          </Link>
        </StyledFooter>
      </StyledMainWrapper>
    </StyledAppWrapper>
  );
}

const StyledNavLink = styled(NavLink)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    paddingBlock: theme.spacing(2),
    paddingInline: theme.spacing(4),

    borderStartEndRadius: 9999,
    borderEndEndRadius: 9999,

    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    textTransform: "uppercase",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.action.disabledBackground,
    },

    "&.active": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  };
});

const StyledAppWrapper = styled("div")(({ theme }) => {
  return {
    display: "flex",
    backgroundColor: theme.palette.background.default,
  };
});

const StyledAside = styled("aside")(({ theme }) => {
  return {
    position: "absolute",
    insetBlock: 0,
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create("inset-inline-start"),

    flexGrow: 0,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",

    inlineSize: "100%",
    blockSize: "100dvh",

    borderInlineEndWidth: 0,
    borderInlineEndStyle: "solid",
    borderInlineEndColor: theme.palette.divider,

    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.up("sm")]: {
      position: "sticky",
      inlineSize: theme.spacing(72),
      borderInlineEndWidth: 1,
    },
  };
});

const StyledMainWrapper = styled("div")({
  flexBasis: "100%",

  display: "flex",
  flexDirection: "column",

  minWidth: 0,
  minHeight: "100dvh",
});

const StyledHeader = styled("header")(({ theme }) => {
  return {
    position: "sticky",
    insetBlockStart: 0,
    zIndex: theme.zIndex.appBar,

    display: "flex",

    borderBottom: "1px solid " + theme.palette.divider,

    paddingBlock: theme.spacing(2),

    transition: theme.transitions.create([
      "padding",
      "background-color",
      "box-shadow",
    ]),
  };
});

const StyledMain = styled("main")(({ theme }) => {
  return {
    padding: theme.spacing(5),
    flexGrow: 1,
  };
});

const StyledFooter = styled("footer")(({ theme }) => {
  return {
    paddingInline: theme.spacing(5),
    paddingBlock: theme.spacing(2),

    borderTop: "1px solid " + theme.palette.divider,
  };
});
