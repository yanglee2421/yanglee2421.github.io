import {
  FiberManualRecordOutlined,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  ListItemButton,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

import type { ListItemButtonProps } from "@mui/material";

export function MenuGroup(props: MenuGroupProps) {
  const { label, icon, children, ...restProps } = props;

  const [open, setOpen] = React.useState(true);

  return (
    <>
      <ListItemButton
        onClick={() => {
          setOpen((p) => !p);
        }}
        {...restProps}
      >
        <ListItemIcon>
          {icon || <FiberManualRecordOutlined></FiberManualRecordOutlined>}
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
        <KeyboardArrowRight
          sx={{
            transition(theme) {
              return theme.transitions.create("transform");
            },
            transform: open ? "rotate(90deg)" : "",
          }}
        ></KeyboardArrowRight>
      </ListItemButton>
      <Collapse in={open} unmountOnExit>
        {children}
      </Collapse>
    </>
  );
}

export interface MenuGroupProps extends ListItemButtonProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
}
