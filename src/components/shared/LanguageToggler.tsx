import { TranslateOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";

import type { IconButtonProps} from "@mui/material";

export function LanguageToggler(props: Props) {
  const { ...restProps } = props;

  const [searchParams, setSearchParams] = useSearchParams({
    lang: "en-US",
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLangChange = (lng: string) => {
    handleClose();

    setSearchParams((searchParams) => {
      searchParams.set("lang", lng);

      return searchParams;
    });
  };

  const lang = searchParams.get("lang");

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
          onClick={handleLangChange.bind(null, "en-US")}
          selected={lang === "en-US"}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={handleLangChange.bind(null, "zh-CN")}
          selected={lang === "zh-CN"}
        >
          简体中文
        </MenuItem>
      </Menu>
    </>
  );
}

type Props = IconButtonProps;
