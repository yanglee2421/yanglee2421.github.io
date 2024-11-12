import { useOnlineStatus } from "@/hooks/dom/useOnlineStatus";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { PersonOutlined, SettingsOutlined } from "@mui/icons-material";
import {
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import React from "react";
import { Translation } from "react-i18next";
import { signOut } from "firebase/auth";
import { auth } from "@/api/firebase/app";

export function UserDropdown() {
  const user = useCurrentUser();
  const isOnline = useOnlineStatus();
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  if (!user) {
    return null;
  }

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Badge
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
        variant="dot"
        overlap="circular"
        color={isOnline ? "success" : "error"}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ cursor: "pointer" }}
      >
        <Avatar src={user.photoURL || ""}>
          {user.displayName?.substring(0, 1)}
        </Avatar>
      </Badge>
      <Menu
        open={!!anchor}
        anchorEl={anchor}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: { minWidth: 180 },
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonOutlined />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              textTransform: "capitalize",
            }}
            primary={
              <Translation ns="/layout/userdropdown">
                {(t) => t("profile")}
              </Translation>
            }
          />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsOutlined />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              textTransform: "capitalize",
            }}
            primary={
              <Translation ns="/layout/userdropdown">
                {(t) => t("setting")}
              </Translation>
            }
          />
        </MenuItem>
        <Divider />
        <Box sx={{ paddingInline: 3, paddingBlock: 3 }}>
          <Button
            onClick={() => {
              signOut(auth);
            }}
            size="small"
            fullWidth
            variant="contained"
            color="error"
          >
            signout
          </Button>
        </Box>
      </Menu>
    </>
  );
}
