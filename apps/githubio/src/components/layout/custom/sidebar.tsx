import {
  AlignHorizontalLeftOutlined,
  Animation,
  DashboardOutlined,
  DragIndicator,
  KeyboardCommandKey,
  MessageOutlined,
  MoreVert,
  Print,
  QrCodeScanner,
  ScienceOutlined,
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
import { Link } from "react-router";

export const Sidebar = (props: React.PropsWithChildren) => {
  return (
    <>
      <Toolbar sx={{ gap: 1 }}>
        <KeyboardCommandKey color="primary" />
        <Typography variant="h6" color="primary">
          应用标题
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
          <ListItemButton selected>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
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
              <ScienceOutlined />
            </ListItemIcon>
            <ListItemText primary="Lab" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Animation />
            </ListItemIcon>
            <ListItemText primary="Animate" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AlignHorizontalLeftOutlined />
            </ListItemIcon>
            <ListItemText primary="Rank" />
          </ListItemButton>
          <ListItemButton component={Link} to={{ pathname: "/qrcode" }}>
            <ListItemIcon>
              <QrCodeScanner />
            </ListItemIcon>
            <ListItemText primary="QR Code" />
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
