// MUI Imports
import { IconButton, IconButtonProps } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

// Redux Imports

// React Imports
import React from "react";
import { useThemeMutation, useThemeQuery } from "@/hooks/api-theme";
import { useQueryClient } from "@tanstack/react-query";

export function ThemeToggle(props: ThemeToggleProps) {
  // ** Props
  const { ...restProps } = props;

  const themeQuery = useThemeQuery();
  const themeMutation = useThemeMutation();
  const queryClient = useQueryClient();

  // Icon Element
  const iconEl = React.useMemo(() => {
    const isDark = themeQuery.data.mode === "dark";

    if (isDark) return <LightModeOutlined />;
    return <DarkModeOutlined />;
  }, [themeQuery.data.mode]);

  // Handle Toogle
  const handleClick = () => {
    const isDark = themeQuery.data.mode === "dark";
    queryClient.setQueryData(["theme-config"], (prev: unknown) => {
      if (!prev) return prev;

      themeMutation.mutate({
        ...prev,
        mode: isDark ? "light" : "dark",
      });
      return { ...prev, mode: isDark ? "light" : "dark" };
    });
  };

  return (
    <IconButton onClick={handleClick} {...restProps}>
      {iconEl}
    </IconButton>
  );
}

export interface ThemeToggleProps extends IconButtonProps {}
