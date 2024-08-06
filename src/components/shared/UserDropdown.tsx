import {
  LogoutOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  alpha,
  Badge,
  ClickAwayListener,
  Popper,
  Fade,
  Paper,
  MenuList,
  MenuItem,
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  styled,
} from "@mui/material";
import { signOut, getAuth } from "firebase/auth";
import React from "react";
import { Translation } from "react-i18next";
import { app } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/store/useCurrentUser";
import { stringToColor } from "@/utils/stringToColor";

export function UserDropdown() {
  const currentUser = useCurrentUser();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  if (!currentUser) {
    return null;
  }

  const handleClose = () => {
    React.startTransition(() => {
      setAnchorEl(null);
    });
  };

  return (
    <>
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
          onClick={(evt) => {
            React.startTransition(() => {
              setAnchorEl(evt.currentTarget);
            });
          }}
          src={currentUser.photoURL || void 0}
          sx={() => {
            const color = stringToColor(currentUser.displayName || "");

            return {
              color,
              bgcolor: alpha(color, 0.12),
              cursor: "pointer",
            };
          }}
        >
          {currentUser.displayName?.substring(0, 1)}
        </Avatar>
      </Badge>
      <Popper
        open={!!anchorEl}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        disablePortal
        sx={{ minWidth: 240 }}
      >
        {(props) => {
          return (
            <Fade
              {...props.TransitionProps}
              style={{
                transformOrigin:
                  props.placement === "bottom-end" ? "right top" : "left top",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        paddingBlock: 2,
                        paddingInline: 4,
                      }}
                    >
                      <Avatar
                        src={currentUser.photoURL || void 0}
                        sx={() => {
                          const color = stringToColor(
                            currentUser.displayName || "",
                          );

                          return {
                            color,
                            bgcolor: alpha(color, 0.12),
                          };
                        }}
                      >
                        {currentUser.displayName?.substring(0, 1)}
                      </Avatar>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          className="font-medium"
                          color="text.primary"
                        >
                          {currentUser.displayName}
                        </Typography>
                        <Typography variant="caption">
                          {currentUser.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ marginBlock: 1 }} />
                    <MenuItem>
                      <ListItemIcon>
                        <PersonOutlineOutlined />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Translation ns="MenuItemPrimary">
                            {(t) => t("my profile")}
                          </Translation>
                        }
                        primaryTypographyProps={{
                          textTransform: "capitalize",
                        }}
                      />
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <SettingsOutlined />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Translation ns="MenuItemPrimary">
                            {(t) => t("settings")}
                          </Translation>
                        }
                        primaryTypographyProps={{
                          textTransform: "capitalize",
                        }}
                      />
                    </MenuItem>
                    <Box
                      sx={{
                        paddingInline: 4,
                        paddingBlock: 2,
                      }}
                    >
                      <Button
                        onClick={() => {
                          signOut(getAuth(app));
                        }}
                        fullWidth
                        color="error"
                        variant="contained"
                        size="small"
                        endIcon={<LogoutOutlined />}
                      >
                        <Translation ns={"button"}>
                          {(t) => t("logout")}
                        </Translation>
                      </Button>
                    </Box>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </>
  );
}

void styled("div")(({ theme }) => {
  const successColor = theme.palette.success.main;

  return {
    backgroundColor: successColor,
    color: successColor,
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
