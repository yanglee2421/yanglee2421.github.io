import { CloseOutlined, MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export function NavMenuButton(props: Props) {
  const { open, onChange } = props;

  return (
    <>
      <IconButton
        onClick={() => {
          React.startTransition(() => {
            onChange();
          });
        }}
        sx={{ display: { sm: "none" } }}
      >
        {open ? <CloseOutlined /> : <MenuOutlined />}
      </IconButton>
    </>
  );
}

type Props = {
  open: boolean;
  onChange(): void;
};
