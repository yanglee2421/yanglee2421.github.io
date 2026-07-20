import {
  Drafts as DraftsIcon,
  ExpandLess,
  ExpandMore,
  Inbox as InboxIcon,
  KeyboardCommandKey,
  MoreVert,
  Send as SendIcon,
  StarBorder,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Collapse,
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

export const Sidebar = (props: React.PropsWithChildren) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((p) => !p);
  };

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
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </List>
        <Box sx={{ height: 2000 }}></Box>
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
