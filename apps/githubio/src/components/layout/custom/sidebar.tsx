import {
  AlignHorizontalLeftOutlined,
  Animation,
  DashboardOutlined,
  DragIndicator,
  Gesture,
  KeyboardCommandKey,
  MessageOutlined,
  MoreVert,
  Print,
  QrCodeScanner,
  ScienceOutlined,
  Widgets,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useLocation, useParams } from "react-router";

const locales = ["en", "zh"];

const normalizePathname = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];

  if (locales.includes(locale)) {
    segments.shift();
  }

  return `/${segments.join("/")}`;
};

export const Sidebar = (props: React.PropsWithChildren) => {
  const location = useLocation();
  const params = useParams();

  const navList = [
    {
      icon: <DashboardOutlined />,
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <Animation />,
      text: "Animate",
      path: "/animate",
    },
    {
      icon: <ScienceOutlined />,
      text: "Lab",
      path: "/lab",
    },
    {
      icon: <QrCodeScanner />,
      text: "QR Code",
      path: "/qrcode",
    },
    {
      icon: <Gesture />,
      text: "Canvas",
      path: "/canvas",
    },
    {
      icon: <Widgets />,
      text: "Awilix",
      path: "/awilix",
    },
    {
      text: "Transition",
      icon: <Animation />,
      path: "/transition",
    },
  ];

  return (
    <>
      <Toolbar sx={{ gap: 1 }}>
        <KeyboardCommandKey color="primary" />
        <Typography variant="h6" color="primary">
          Acme Inc.
        </Typography>
        <Box sx={{ mx: "auto" }} />
        {props.children}
      </Toolbar>
      <Divider></Divider>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <List
          subheader={
            <ListSubheader disableSticky>Nested List Items</ListSubheader>
          }
        >
          {navList.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={{ pathname: `/${params.lang}/${item.path}` }}
              selected={normalizePathname(location.pathname) === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
          <ListItemButton>
            <ListItemIcon>
              <DragIndicator />
            </ListItemIcon>
            <ListItemText primary="Drag & Drop" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <MessageOutlined />
            </ListItemIcon>
            <ListItemText primary="Snackbar" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AlignHorizontalLeftOutlined />
            </ListItemIcon>
            <ListItemText primary="Rank" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Print />
            </ListItemIcon>
            <ListItemText primary="Print" />
          </ListItemButton>
        </List>
      </Box>
      <Divider></Divider>
      <Toolbar sx={{ gap: 1.5 }}>
        <Avatar>S</Avatar>
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            Show
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            3182703224@qq.com
          </Typography>
        </Box>
        <Box sx={{ mx: "auto" }}></Box>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Toolbar>
    </>
  );
};
