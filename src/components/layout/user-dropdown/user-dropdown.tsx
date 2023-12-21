// MUI Imports
import {
  Avatar,
  Badge,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  alpha,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

// React Imports
import React from "react";

// Store Imports
import { useAuth } from "@/hooks/store";

// Utils Imports
import { stringToColor } from "@/utils";

export function UserDropdown() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const openHandler: React.MouseEventHandler<HTMLSpanElement> = (evt) => {
    setAnchorEl(evt.currentTarget);
    setOpen(true);
  };
  const closeHandler = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // Login hooks
  const auth = useAuth();

  return (
    <>
      <Badge
        onClick={openHandler}
        variant="dot"
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={(theme) => {
          return {
            ml: 2,
            cursor: "pointer",

            "& .MuiBadge-badge": {
              backgroundColor: "#44b700",
              color: "#44b700",
              boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
              "&::after": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                animation: "ripple 1.2s infinite ease-in-out",
                border: "1px solid currentColor",
                content: '""',
              },
            },
            "@keyframes ripple": {
              "0%": {
                transform: "scale(.8)",
                opacity: 1,
              },
              "100%": {
                transform: "scale(2.4)",
                opacity: 0,
              },
            },
          };
        }}
      >
        <Avatar
          src={auth.currentUser?.photoURL || ""}
          alt="avator"
          sx={{
            color: auth.currentUser?.displayName
              ? stringToColor(auth.currentUser.displayName.at(0) || "")
              : void 0,
            bgcolor: auth.currentUser?.displayName
              ? alpha(
                  stringToColor(auth.currentUser.displayName.at(0) || ""),
                  0.12
                )
              : void 0,
          }}
        >
          {auth.currentUser?.displayName?.at(0)}
        </Avatar>
      </Badge>
      <Menu
        open={open}
        onClose={closeHandler}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{ "& .MuiMenu-paper": { width: 230, mt: 4 } }}
      >
        <MenuItem>one</MenuItem>
        <MenuItem>one</MenuItem>
        <Divider></Divider>
        <MenuItem
          onClick={() => {
            auth.signOut();
          }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
