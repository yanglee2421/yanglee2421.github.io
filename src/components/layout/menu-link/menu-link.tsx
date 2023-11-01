// React Imports
import React from "react";

// MUI Imports
import {
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FiberManualRecordOutlined } from "@mui/icons-material";

// Router Imports
import {
  To,
  useResolvedPath,
  useLocation,
  RelativeRoutingType,
  UNSAFE_NavigationContext,
  Link,
} from "react-router-dom";

export function MenuLink(props: MenuLinkProps) {
  // ** Props
  const { label, icon, to, end, caseSensitive, relative, ...restProps } = props;

  // Icon node
  const iconNode = React.useMemo(() => {
    if (icon) return icon;
    return <FiberManualRecordOutlined />;
  }, [icon]);

  // Get isActive
  const path = useResolvedPath(to, { relative });
  const location = useLocation();
  const { navigator } = React.useContext(UNSAFE_NavigationContext);

  let locationPathname = location.pathname;
  let toPathname = navigator.encodeLocation
    ? navigator.encodeLocation(path).pathname
    : path.pathname;

  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    toPathname = toPathname.toLowerCase();
  }

  const isActive =
    locationPathname === toPathname ||
    (!end &&
      locationPathname.startsWith(toPathname) &&
      locationPathname.charAt(toPathname.length) === "/");

  return (
    <ListItemButton component={Link} to={to} selected={isActive} {...restProps}>
      <ListItemIcon>{iconNode}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </ListItemButton>
  );
}

export interface MenuLinkProps extends ListItemButtonProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
  to: To;
  end?: boolean;
  caseSensitive?: boolean;
  relative?: RelativeRoutingType;
}
