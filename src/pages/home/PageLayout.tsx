import {
  NotificationsOutlined,
  FavoriteBorderOutlined,
  SearchOutlined,
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
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "16rem 1fr" },
      }}
    >
      <Box
        component={"aside"}
        sx={{
          position: "sticky",
          insetBlock: 0,
          blockSize: "100dvh",

          display: { xs: "none", md: "flex" },
          flexDirection: "column",

          borderRight(theme) {
            return "1px solid " + theme.palette.divider;
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,

            paddingInline: 4,
            paddingBlock: 2,

            color(theme) {
              return theme.palette.primary.main;
            },
            fontSize: 22,

            borderBottom(theme) {
              return "1px solid " + theme.palette.divider;
            },
          }}
        >
          <Materio width={"1.2658em"} height={"1em"} />
          <Typography
            variant="h6"
            color="WindowText"
            sx={{
              textTransform: "uppercase",
            }}
          >
            materio
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <ScrollView options={{ wheelPropagation: false }}>
            <Box height={2000}>
              <StyledNavLink to={{ pathname: "/" }}>home</StyledNavLink>
              <StyledNavLink to={{ pathname: "/404" }}>404</StyledNavLink>
            </Box>
          </ScrollView>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
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
            <Box
              component={"main"}
              sx={{ display: showMenu ? "none" : "block", px: 2 }}
            >
              {props.children}
            </Box>
          </Fade>
        </SwitchTransition>
        {showMenu && <Box sx={{ height: 1000 }}>menu list</Box>}
        <Box
          component={"footer"}
          sx={{
            paddingInline: 2,
            paddingBlock: 4,
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
      </Box>
    </Box>
  );
}

const StyledNavLink = styled(NavLink)(({ theme }) => {
  return {
    display: "flex",
    paddingBlock: theme.spacing(2),
    paddingInline: theme.spacing(4),

    color: "inherit",
    fontSize: theme.typography.h6.fontSize,
    textTransform: "uppercase",
    textDecoration: "none",

    "&.active": {
      color: theme.palette.primary.main,
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
  };
});
