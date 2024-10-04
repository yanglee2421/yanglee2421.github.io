import { TranslateOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";

export function LangToggle() {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const location = useLocation();
  const params = useParams();

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        <TranslateOutlined />
      </IconButton>
      <Menu open={!!anchor} anchorEl={anchor} onClose={handleClose}>
        <MenuItem
          component={Link}
          to={{
            pathname: location.pathname.replace(
              new RegExp(`^/${params.lang}`),
              "/en",
            ),
            search: location.search,
            hash: location.hash,
          }}
        >
          English
        </MenuItem>
        <MenuItem
          component={Link}
          to={{
            pathname: location.pathname.replace(
              new RegExp(`^/${params.lang}`),
              "/zh",
            ),
            search: location.search,
            hash: location.hash,
          }}
        >
          简体中文
        </MenuItem>
      </Menu>
    </>
  );
}
