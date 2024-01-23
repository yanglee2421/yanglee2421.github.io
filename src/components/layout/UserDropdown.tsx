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
  styled,
} from "@mui/material";
import { ExitToApp, PeopleOutline } from "@mui/icons-material";

// React Imports
import React from "react";

// Store Imports
import { useAuthStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";

// Utils Imports
import { stringToColor } from "@/utils";

// Router Imports
import { Link } from "react-router-dom";

export function UserDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  // Login hooks
  const authValue = useAuthStore(
    useShallow((store) => {
      return store.value;
    })
  );

  const closeHandler = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledBadge
        onClick={(evt) => {
          setAnchorEl(evt.currentTarget);
        }}
        variant="dot"
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Avatar
          src={authValue.auth.currentUser?.photoURL || ""}
          alt="avator"
          sx={{
            color: authValue.auth.currentUser?.displayName
              ? stringToColor(authValue.auth.currentUser.displayName || "")
              : void 0,
            bgcolor: authValue.auth.currentUser?.displayName
              ? alpha(
                  stringToColor(authValue.auth.currentUser.displayName || ""),
                  0.12
                )
              : void 0,
          }}
        >
          {authValue.auth.currentUser?.displayName?.at(0)?.toUpperCase()}
        </Avatar>
      </StyledBadge>
      <Menu
        open={!!anchorEl}
        onClose={closeHandler}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{ "& .MuiMenu-paper": { width: 230, mt: 4 } }}
      >
        <MenuItem component={Link} to={"/account"} onClick={closeHandler}>
          <ListItemIcon>
            <PeopleOutline></PeopleOutline>
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
        </MenuItem>
        <MenuItem>one</MenuItem>
        <Divider></Divider>
        <MenuItem
          onClick={() => {
            authValue.auth.signOut();
          }}
        >
          <ListItemIcon>
            <ExitToApp></ExitToApp>
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

const StyledBadge = styled(Badge)(({ theme }) => {
  return {
    marginLeft: theme.spacing(2),
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

    // ** Animate
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
});
