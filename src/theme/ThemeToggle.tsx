// MUI Imports
import { IconButton, IconButtonProps } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

export function ThemeToggle(props: ThemeToggleProps) {
  // ** Props
  const { ...restProps } = props;

  // Handle Toogle
  const handleClick = () => {};

  return (
    <IconButton onClick={handleClick} {...restProps}>
      {true ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
}

export interface ThemeToggleProps extends IconButtonProps {}
