import { TranslateOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";

export function LangToggler() {
  const [searchParams, setSearchParams] = useSearchParams({
    lang: "en",
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClose = () => {
    React.startTransition(() => {
      setAnchorEl(null);
    });
  };

  const lang = searchParams.get("lang");

  return (
    <>
      <IconButton
        onClick={(evt) => {
          React.startTransition(() => {
            setAnchorEl(evt.currentTarget);
          });
        }}
      >
        <TranslateOutlined />
      </IconButton>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        <MenuItem
          selected={lang === "en"}
          onClick={() => {
            handleClose();
            setSearchParams((prev) => {
              prev.set("lang", "en");
              return prev;
            });
          }}
        >
          English
        </MenuItem>
        <MenuItem
          selected={lang === "zh"}
          onClick={() => {
            handleClose();
            setSearchParams((prev) => {
              prev.set("lang", "zh");
              return prev;
            });
          }}
        >
          简体中文
        </MenuItem>
      </Menu>
    </>
  );
}
