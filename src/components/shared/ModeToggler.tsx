import {
  DarkModeOutlined,
  LightModeOutlined,
  DesktopWindowsOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React from "react";
import { Translation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { useThemeStore } from "@/hooks/store/useThemeStore";
import type { IconButtonProps } from "@mui/material";

export function ModeToggler(props: Props) {
  const { ...restProps } = props;

  const { mode, setMode } = useThemeStore(
    useShallow((store) => {
      return {
        mode: store.mode,
        setMode: store.setMode,
      };
    }),
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
            case "dark":
              return <DarkModeOutlined />;
            case "light":
              return <LightModeOutlined />;
            case "system":
            default:
              return <DesktopWindowsOutlined />;
          }
        })()}
      </IconButton>
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleModeChange.bind(null, "system")}>
          <ListItemIcon>
            <DesktopWindowsOutlined />
          </ListItemIcon>
          <ListItemText
            primary={
              <Translation ns="MenuItemPrimary">
                {(t) => t("system")}
              </Translation>
            }
            primaryTypographyProps={{
              textTransform: "uppercase",
            }}
          />
        </MenuItem>
        <MenuItem onClick={handleModeChange.bind(null, "light")}>
          <ListItemIcon>
            <LightModeOutlined />
          </ListItemIcon>
          <ListItemText
            primary={
              <Translation ns="MenuItemPrimary">
                {(t) => t("light")}
              </Translation>
            }
            primaryTypographyProps={{
              textTransform: "uppercase",
            }}
          />
        </MenuItem>
        <MenuItem onClick={handleModeChange.bind(null, "dark")}>
          <ListItemIcon>
            <DarkModeOutlined />
          </ListItemIcon>
          <ListItemText
            primary={
              <Translation ns="MenuItemPrimary">{(t) => t("dark")}</Translation>
            }
            primaryTypographyProps={{
              textTransform: "uppercase",
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}

type Props = IconButtonProps;
