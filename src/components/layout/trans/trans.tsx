// MUI Imports
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Translate } from "@mui/icons-material";

// React Imports
import React from "react";

// I18n Imports
import { useTranslation } from "react-i18next";

export function Trans() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const closeHandler = () => {
    setOpen(false);
  };
  const openHandler: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
    setAnchorEl(evt.currentTarget);
    setOpen(true);
  };

  // Menu item click handler
  const { i18n } = useTranslation();
  const lng = i18n.language;
  const toItemHandler = (lng: string) => {
    return () => {
      i18n.changeLanguage(lng);
      closeHandler();
    };
  };

  return (
    <>
      <IconButton onClick={openHandler}>
        <Translate />
      </IconButton>
      <Menu open={open} onClose={closeHandler} anchorEl={anchorEl}>
        <MenuItem onClick={toItemHandler("en-US")} selected={lng === "en-US"}>
          English
        </MenuItem>
        <MenuItem onClick={toItemHandler("zh-CN")} selected={lng === "zh-CN"}>
          简体中文
        </MenuItem>
      </Menu>
    </>
  );
}
