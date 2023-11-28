// MUI Imports
import { IconButton, IconButtonProps } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

// Redux Imports
import { useAppSelector, useAppDispatch, sliceTheme } from "@/redux";

// React Imports
import React from "react";

export function ThemeToggle(props: ThemeToggleProps) {
  // ** Props
  const { ...restProps } = props;

  const mode = useAppSelector((s) => {
    return s.theme.mode;
  });
  const dispatch = useAppDispatch();

  // Icon Element
  const iconEl = React.useMemo(() => {
    const isDark = mode === "dark";

    if (isDark) return <LightModeOutlined />;
    return <DarkModeOutlined />;
  }, [mode]);

  // Handle Toogle
  const handleClick = () => {
    dispatch(sliceTheme.actions.mode("dark"));
  };

  return (
    <IconButton onClick={handleClick} {...restProps}>
      {iconEl}
    </IconButton>
  );
}

export interface ThemeToggleProps extends IconButtonProps {}
