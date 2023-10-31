// React Imports
import React from "react";

// MUI Imports
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FiberManualRecordOutlined } from "@mui/icons-material";

// Router Imports
import {
  NavLink,
  To,
  useResolvedPath,
  useLocation,
  RelativeRoutingType,
  UNSAFE_NavigationContext,
} from "react-router-dom";

export function MenuLink(props: MenuLinkProps) {
  // ** Props
  const { label, icon, to, end, caseSensitive, relative } = props;

  const iconNode = React.useMemo(() => {
    if (icon) return icon;
    return <FiberManualRecordOutlined />;
  }, [icon]);

  // Get isActive
  const path = useResolvedPath(to, { relative });
  const location = useLocation();
  const { navigator } = React.useContext(UNSAFE_NavigationContext);
  let toPathname = navigator.encodeLocation
    ? navigator.encodeLocation(path).pathname
    : path.pathname;
  let locationPathname = location.pathname;

  if (!caseSensitive) {
    toPathname = toPathname.toLowerCase();
    locationPathname = locationPathname.toLowerCase();
  }

  const isActive =
    locationPathname === toPathname ||
    (!end &&
      locationPathname.startsWith(toPathname) &&
      locationPathname.charAt(toPathname.length) === "/");

  return (
    <ListItemButton component={NavLink} to={to} selected={isActive}>
      <ListItemIcon>{iconNode}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItemButton>
  );
}

export interface MenuLinkProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
  to: To;
  end?: boolean;
  caseSensitive?: boolean;
  relative?: RelativeRoutingType;
}
