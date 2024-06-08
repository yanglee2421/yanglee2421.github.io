import { LogoutOutlined, PersonOutlineOutlined } from "@mui/icons-material";
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
} from "@mui/material";
import React from "react";
import { Translation } from "react-i18next";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { stringToColor } from "@/utils/stringToColor";

export function UserDropdown() {
  const currentUser = useAuthStore((state) => state.value.auth.currentUser);
  const auth = useAuthStore((state) => state.value.auth);

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
                    <Box
                      sx={{
                        paddingInline: 4,
                        paddingBlock: 2,
                      }}
                    >
                      <Button
                        onClick={() => {
                          auth.signOut();
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
