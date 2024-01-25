// MUI Imports
import { IconButton, IconButtonProps, Menu, MenuItem } from "@mui/material";
import { TranslateOutlined } from "@mui/icons-material";

// React Imports
import React from "react";

// I18n Imports
import { useTranslation } from "react-i18next";

export function LanguageToggler(props: Props) {
  // ** Props
  const { ...restProps } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { i18n } = useTranslation();

  const toItemHandler = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={(evt) => {
          setAnchorEl(evt.currentTarget);
        }}
        {...restProps}
      >
        <TranslateOutlined></TranslateOutlined>
      </IconButton>
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem
          onClick={toItemHandler.bind(null, "en-US")}
          selected={i18n.language === "en-US"}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={toItemHandler.bind(null, "zh-CN")}
          selected={i18n.language === "zh-CN"}
        >
          简体中文
        </MenuItem>
      </Menu>
    </>
  );
}

type Props = IconButtonProps;
