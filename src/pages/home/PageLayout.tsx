import { useAuthStore } from "@/hooks/store/useAuthStore";
import { stringToColor } from "@/utils/stringToColor";
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
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  DesktopWindowsOutlined,
  MenuOutlined,
  NotStartedOutlined,
  NotificationsOutlined,
  TranslateOutlined,
} from "@mui/icons-material";

export function PageLayout(props: React.PropsWithChildren) {
  const currentUser = useAuthStore((state) => state.value.auth.currentUser);

  if (!currentUser) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component={"aside"}
        sx={{ width: { xs: 0, md: 196 }, display: { xs: "none", md: "block" } }}
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
      <Box sx={{ width: "100%", p: 3 }}>
        <Box component={"header"} sx={{ display: "flex", gap: 3 }}>
          <IconButton sx={{ display: { xs: "block", md: "none" } }}>
            <MenuOutlined />
          </IconButton>
          <IconButton sx={{ ml: "auto" }}>
            <TranslateOutlined />
          </IconButton>
          <IconButton>
            <DesktopWindowsOutlined />
          </IconButton>
          <IconButton>
            <NotificationsOutlined />
          </IconButton>
          <Avatar
            src={currentUser.photoURL || void 0}
            sx={() => {
              const color = stringToColor(currentUser.displayName || "");

              return { color, bgcolor: alpha(color, 0.12) };
            }}
          >
            {currentUser.displayName?.substring(0, 1)}
          </Avatar>
        </Box>
        <Box component={"main"}>{props.children}</Box>
        <Box
          component={"footer"}
          sx={{
            py: 3,
          }}
        >
          &copy; 2024, Made with ❤️ by{" "}
          <Link href="https://github.com/yanglee2421" underline="hover">
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
