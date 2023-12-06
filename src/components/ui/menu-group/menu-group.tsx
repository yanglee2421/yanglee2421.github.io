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
  const toggleHandler = () => {
    setOpen((p) => !p);
  };

  // Arrow icon node
  const arrowNode = React.useMemo(() => {
    return (
      <KeyboardArrowRight
        sx={{
          transition(theme) {
            return theme.transitions.create("transform");
          },
          transform: open ? "rotate(90deg)" : "",
        }}
      />
    );
  }, [open]);

  // Menu icon node
  const iconNode = React.useMemo(() => {
    if (icon) return icon;
    return <FiberManualRecordOutlined />;
  }, [icon]);

  return (
    <>
      <ListItemButton
        onClick={toggleHandler}
        sx={{
          backgroundColor(theme) {
            return open ? theme.palette.action.selected : void 0;
          },
        }}
        {...restProps}
      >
        <ListItemIcon>{iconNode}</ListItemIcon>
        <ListItemText>{label}</ListItemText>
        {arrowNode}
      </ListItemButton>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        {children}
      </Collapse>
    </>
  );
}

export interface MenuGroupProps extends ListItemButtonProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
}
