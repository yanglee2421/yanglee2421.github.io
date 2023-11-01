// MUI Imports
import {
  Close,
  Menu,
  HomeOutlined,
  FeedOutlined,
  ArticleOutlined,
} from "@mui/icons-material";
import { IconButton, Drawer, Box, List, IconButtonProps } from "@mui/material";

// React Imports
import React from "react";

// Components Imports
import { Scrollbar } from "@/components/ui/scrollbar";
import { MenuGroup } from "@/components/ui/menu-group";
import { MenuLink } from "@/components/ui/menu-link";

export function MenuDrawer(props: MenuDrawerProps) {
  // ** Props
  const { icon, ...restProps } = props;

  const [open, setOpen] = React.useState(false);
  const closeHandler = () => {
    setOpen(false);
  };
  const openHandler = () => {
    setOpen(true);
  };

  const iconNode = React.useMemo(() => {
    if (icon) return icon;
    return <Menu />;
  }, [icon]);

  return (
    <>
      <IconButton onClick={openHandler} {...restProps}>
        {iconNode}
      </IconButton>
      <Drawer
        open={open}
        onClose={closeHandler}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: { sm: 320 },
          },
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          boxSizing={"border-box"}
          height={"100%"}
        >
          <Box
            p={2}
            sx={{
              borderBottom: 1,
              borderColor(theme) {
                return theme.palette.divider;
              },
            }}
          >
            <IconButton onClick={closeHandler}>
              <Close />
            </IconButton>
          </Box>
          <Box flex={1} overflow={"hidden"}>
            <Scrollbar>
              <List component={"nav"} disablePadding>
                <MenuLink icon={<HomeOutlined />} label="Home" to={"/"} />
                <MenuGroup icon={<ArticleOutlined />} label="Pages">
                  <MenuLink label="Not Found" to={"404"} />
                </MenuGroup>
                <MenuGroup icon={<FeedOutlined />} label="Form">
                  <MenuLink label="Input" to={"input"} />
                  <MenuLink label="Upload" to={"upload"} />
                  <MenuLink label="Autocomplete" to={"autocomplete"} />
                </MenuGroup>
              </List>
              <Box height={1000}></Box>
            </Scrollbar>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export interface MenuDrawerProps extends IconButtonProps {
  icon?: React.ReactNode;
}
