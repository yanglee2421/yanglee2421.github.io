// MUI Imports
import { IconButton } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

// Redux Imports
import { useAppDispatch, useAppSelector, sliceTheme } from "@/redux";

// React Imports
import React from "react";

export function ThemeToggle() {
  // Redux Hooks
  const isDark = useAppSelector((s) => s.theme.isDark);
  const dispatch = useAppDispatch();

  // Icon Element
  const iconEl = React.useMemo(() => {
    if (isDark) return <LightModeOutlined />;
    return <DarkModeOutlined />;
  }, [isDark]);

  // Handle Toogle
  const handleClick = () => {
    const action = sliceTheme.actions.isDarkToggle();
    dispatch(action);
  };

  return <IconButton onClick={handleClick}>{iconEl}</IconButton>;
}
