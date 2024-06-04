import {
  DesktopWindowsOutlined,
  MenuOutlined,
  NotStartedOutlined,
  NotificationsOutlined,
  TranslateOutlined,
  FavoriteBorderOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import {
  Box,
  Avatar,
  alpha,
  Link,
  List,
  ListItemButton,
  ListItemText,
  styled,
  ListItemIcon,
  IconButton,
  Badge,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useIsScrolled } from "@/hooks/dom/useIsScrolled";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { stringToColor } from "@/utils/stringToColor";

export function PageLayout(props: React.PropsWithChildren) {
  const currentUser = useAuthStore((state) => state.value.auth.currentUser);

  const isScrolled = useIsScrolled();

  if (!currentUser) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component={"aside"}
        sx={{
          width: { xs: 0, md: 196 },
          display: { xs: "none", md: "block" },
          borderRight(theme) {
            return "1px solid " + theme.palette.divider;
          },
          boxShadow(theme) {
            return theme.shadows[1];
          },
        }}
      >
        <List disablePadding>
          <StyledNavLink to={{ pathname: "/" }}>
            <ListItemButton>
              <ListItemIcon>
                <NotStartedOutlined />
              </ListItemIcon>
              <ListItemText primary={"primary"} />
            </ListItemButton>
          </StyledNavLink>
        </List>
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
            px: isScrolled ? 6 : 3,

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
          <Stack direction={"row"} spacing={3} alignItems={"center"}>
            <IconButton sx={{ display: { md: "none" } }}>
              <MenuOutlined />
            </IconButton>
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
            sx={{ ml: "auto", alignItems: "center" }}
          >
            <IconButton>
              <TranslateOutlined />
            </IconButton>
            <IconButton>
              <DesktopWindowsOutlined />
            </IconButton>
            <IconButton>
              <FavoriteBorderOutlined />
            </IconButton>
            <IconButton>
              <NotificationsOutlined />
            </IconButton>
            <Badge
              variant="dot"
              color="success"
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar
                src={currentUser.photoURL || void 0}
                sx={() => {
                  const color = stringToColor(currentUser.displayName || "");

                  return {
                    color,
                    bgcolor: alpha(color, 0.12),
                  };
                }}
              >
                {currentUser.displayName?.substring(0, 1)}
              </Avatar>
            </Badge>
          </Stack>
        </Box>
        <Box component={"main"} sx={{ px: 3 }}>
          {props.children}
        </Box>
        <Box
          component={"footer"}
          sx={{
            p: 3,
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

const StyledNavLink = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
});
