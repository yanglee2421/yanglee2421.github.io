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
import { Mode, useLocaleStore } from "@/hooks/store/useLocaleStore";

export function ModeToggle() {
  const mode = useLocaleStore((s) => s.mode);
  const updateMode = useLocaleStore((s) => s.update);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchor(null);
  };

  const handleModeChange = (mode: Mode) => {
    updateMode({ mode });
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
