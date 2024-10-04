import React from "react";

import {
  Mode,
  useThemeStore,
  useThemeStoreHasHydrated,
} from "@/hooks/store/useThemeStore";
import {
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  styled,
  Box,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  DesktopWindowsOutlined,
} from "@mui/icons-material";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { LangToggle } from "@/components/shared/LangToggle";

export function Home() {
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
      <Header>
        <Box sx={{ marginInlineStart: "auto" }}></Box>
        <LangToggle />
        <ModeToggle />
      </Header>
    </>
  );
}

const Header = styled("header")(({ theme: t }) => ({
  display: "flex",
  gap: 3,

  paddingInline: t.spacing(5),
  paddingBlock: t.spacing(2),
}));

const columns = 12;
const gutter = 20;
const width = 1200;
const perColumnsWidth = (width - (columns - 1) * gutter) / columns;
const c = 4;
const blockWidth = c * perColumnsWidth + (c - 1) * gutter;

function getWidthOfUnknowColumns(c: number) {
  return (width * c) / columns - (columns - c) * (gutter / columns);
}

console.log(blockWidth, Object.is(blockWidth, getWidthOfUnknowColumns(4)));
