// MUI Imports
import { IconButton, IconButtonProps } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

// Store Imports
import { useThemeStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";
import { useIsDark } from "@/hooks";

export function ThemeToggle(props: IconButtonProps) {
  // ** Props
  const { ...restProps } = props;

  const themeStore = useThemeStore(
    useShallow((store) => {
      return {
        mode: store.mode,
        setMode: store.setMode,
      };
    })
  );

  const isDark = useIsDark();

  const mode = (() => {
    switch (themeStore.mode) {
      case "light":
        return false;
      case "dark":
        return true;
      case "auto":
      default:
        return isDark;
    }
  })();

  // Handle Toogle
  const handleClick = () => {
    themeStore.setMode(() => {
      return mode ? "light" : "dark";
    });
  };

  return (
    <IconButton onClick={handleClick} {...restProps}>
      {mode ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
}
