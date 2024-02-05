// React Imports
import React from "react";

// MUI Imports
import {
  ListItemButton,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItemButtonProps,
} from "@mui/material";
import {
  FiberManualRecordOutlined,
  KeyboardArrowRight,
} from "@mui/icons-material";

export function MenuGroup(props: MenuGroupProps) {
  // ** Props
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
