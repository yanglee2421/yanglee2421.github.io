import {
  DesktopWindowsOutlined,
  LightModeOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/hooks/store/useThemeStore";

export function ModeToggler() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);

  const { t } = useTranslation("MenuItemPrimary");

  const handleClose = () => {
    React.startTransition(() => {
      setAnchorEl(null);
    });
  };

  return (
    <>
      <IconButton
        onClick={(evt) => {
          React.startTransition(() => {
            setAnchorEl(evt.currentTarget);
          });
        }}
      >
        {(() => {
          switch (mode) {
            case "light":
              return <LightModeOutlined />;
            case "dark":
              return <DarkModeOutlined />;
            case "system":
            default:
              return <DesktopWindowsOutlined />;
          }
        })()}
      </IconButton>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setMode("system");
          }}
        >
          <ListItemIcon>
            <DesktopWindowsOutlined />
          </ListItemIcon>
          <ListItemText
            primary={t("system")}
            primaryTypographyProps={{
              textTransform: "uppercase",
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setMode("light");
          }}
        >
          <ListItemIcon>
            <LightModeOutlined />
          </ListItemIcon>
          <ListItemText
            primary={t("light")}
            primaryTypographyProps={{
              textTransform: "uppercase",
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setMode("dark");
          }}
        >
          <ListItemIcon>
            <DarkModeOutlined />
          </ListItemIcon>
          <ListItemText
            primary={t("dark")}
            primaryTypographyProps={{
              textTransform: "uppercase",
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
