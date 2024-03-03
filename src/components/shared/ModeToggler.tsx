import React from "react";

import type {
  IconButtonProps} from "@mui/material";
import {
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  DesktopWindowsOutlined,
} from "@mui/icons-material";

import { useShallow } from "zustand/react/shallow";

import { useThemeStore } from "@/hooks/store/useThemeStore";

export function ModeToggler(props: Props) {
  const { ...restProps } = props;

  const { mode, setMode } = useThemeStore(
    useShallow((store) => {
      return {
        mode: store.mode,
        setMode: store.setMode,
      };
    })
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (value: typeof mode) => {
    handleClose();
    React.startTransition(() => {
      setMode(value);
    });
  };

  return (
    <>
      <IconButton
        onClick={(evt) => {
          setAnchorEl(evt.currentTarget);
        }}
        {...restProps}
      >
        {(() => {
          switch (mode) {
            case "system":
              return <DesktopWindowsOutlined></DesktopWindowsOutlined>;
            case "dark":
              return <DarkModeOutlined></DarkModeOutlined>;
            case "light":
              return <LightModeOutlined></LightModeOutlined>;
            default:
              return null;
          }
        })()}
      </IconButton>
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleModeChange.bind(null, "light")}>
          <ListItemIcon>
            <LightModeOutlined></LightModeOutlined>
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleModeChange.bind(null, "dark")}>
          <ListItemIcon>
            <DarkModeOutlined></DarkModeOutlined>
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleModeChange.bind(null, "system")}>
          <ListItemIcon>
            <DesktopWindowsOutlined></DesktopWindowsOutlined>
          </ListItemIcon>
          <ListItemText>System</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

type Props = IconButtonProps;
