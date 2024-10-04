import React from "react";
import { Mode, useThemeStore } from "@/hooks/store/useThemeStore";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  DesktopWindowsOutlined,
} from "@mui/icons-material";

export function ModeToggle() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.set);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchor(null);
  };

  const handleModeChange = (mode: Mode) => {
    setMode({ mode });
    handleClose();
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        {mode === "dark" && <DarkModeOutlined />}
        {mode === "light" && <LightModeOutlined />}
        {mode === "system" && <DesktopWindowsOutlined />}
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={handleClose}>
        <MenuItem onClick={handleModeChange.bind(null, "system")}>
          <ListItemIcon>
            <DesktopWindowsOutlined />
          </ListItemIcon>
          <ListItemText primary="system" />
        </MenuItem>
        <MenuItem onClick={handleModeChange.bind(null, "light")}>
          <ListItemIcon>
            <LightModeOutlined />
          </ListItemIcon>
          <ListItemText primary="light" />
        </MenuItem>
        <MenuItem onClick={handleModeChange.bind(null, "dark")}>
          <ListItemIcon>
            <DarkModeOutlined />
          </ListItemIcon>
          <ListItemText primary="dark" />
        </MenuItem>
      </Menu>
    </>
  );
}
