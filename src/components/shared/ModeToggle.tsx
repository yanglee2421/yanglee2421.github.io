import React from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  DarkModeOutlined,
  DesktopWindowsOutlined,
  LightModeOutlined,
} from "@mui/icons-material";
import { type Mode, useLocalStore } from "@/hooks/store/useLocalStore";

export function ModeToggle() {
  const mode = useLocalStore((s) => s.mode);
  const updateMode = useLocalStore((s) => s.update);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchor(null);
  };

  const handleModeChange = (mode: Mode) => {
    const update = () => {
      updateMode({ mode });
      handleClose();
    };

    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(update);
      return;
    }

    update();
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
          <ListItemText primary="System" />
        </MenuItem>
        <MenuItem onClick={handleModeChange.bind(null, "light")}>
          <ListItemIcon>
            <LightModeOutlined />
          </ListItemIcon>
          <ListItemText primary="Light" />
        </MenuItem>
        <MenuItem onClick={handleModeChange.bind(null, "dark")}>
          <ListItemIcon>
            <DarkModeOutlined />
          </ListItemIcon>
          <ListItemText primary="Dark" />
        </MenuItem>
      </Menu>
    </>
  );
}
