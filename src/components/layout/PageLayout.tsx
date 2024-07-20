import {
  NotificationsOutlined,
  FavoriteBorderOutlined,
  SearchOutlined,
  HomeOutlined,
  Grid3x3Outlined,
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
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { NavMenuButton } from "./NavMenuButton";
import type { Theme } from "@mui/material";

export function PageLayout(props: React.PropsWithChildren) {
  const currentUser = useAuthStore((state) => state.value.auth.currentUser);

  const isScrolled = useIsScrolled();

  const [showMenu, setShowMenu] = React.useState(false);

  const mediumScreen = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.up("md");
  });

  if (mediumScreen && showMenu) {
    setShowMenu(false);
  }

  if (!currentUser) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
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

            boxShadow(theme) {
              return theme.shadows[1];
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
                <span>home</span>
              </StyledNavLink>
              <StyledNavLink to={{ pathname: "/table" }}>
                <Grid3x3Outlined sx={{ marginInlineEnd: 2 }} />
                <span>table</span>
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

      {/* Main Wapper */}
      <Box sx={{ inlineSize: "100%" }}>
        <Box
          component={"header"}
          sx={{
            position: "sticky",
            insetBlockStart: 0,
            zIndex(theme) {
              return theme.zIndex.appBar;
            },
            display: "flex",
            py: 3,
            px: isScrolled ? 4 : 2,

            boxShadow(theme) {
              return isScrolled ? theme.shadows[1] : void 0;
            },
            backdropFilter: isScrolled ? "blur(9px)" : void 0,
            bgcolor(theme) {
              return isScrolled
                ? alpha(theme.palette.background.paper, 0.85)
                : theme.palette.background.default;
            },

            transition(theme) {
              return theme.transitions.create([
                "padding",
                "background-color",
                "box-shadow",
              ]);
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
        </Box>
        <SwitchTransition>
          <Fade key={1} unmountOnExit>
            <main>{props.children}</main>
          </Fade>
        </SwitchTransition>
        <footer>
          <Box
            sx={{
              paddingInline: 5,
              paddingBlock: 2,
            }}
          >
            &copy; 2024, Made with ❤️ by{" "}
            <Link
              href="https://github.com/yanglee2421"
              target="https://github.com/yanglee2421"
              underline="hover"
            >
              YangLee2421
            </Link>
          </Box>
        </footer>
      </Box>
    </Box>
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

const StyledAside = styled("aside")(({ theme }) => {
  return {
    position: ["absolute", "sticky"],
    insetBlock: 0,
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create("inset-inline-start"),

    flexGrow: 0,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",

    inlineSize: ["100%", theme.spacing(72)],
    blockSize: "100dvh",

    borderInlineEndWidth: [0, 1],
    borderInlineEndStyle: "solid",
    borderInlineEndColor: theme.palette.divider,

    backgroundColor: theme.palette.background.default,
  };
});
