// MUI Imports
import {
  Close,
  Menu,
  HomeOutlined,
  FeedOutlined,
  ArticleOutlined,
  GridOnOutlined,
  FormatListNumberedOutlined,
  ScienceOutlined,
  DataSaverOffOutlined,
} from "@mui/icons-material";
import { IconButton, Drawer, Box, List, IconButtonProps } from "@mui/material";

// React Imports
import React from "react";

// Components Imports
import { ScrollView } from "@/components/ui/ScrollView";
import { MenuGroup, MenuLink } from "@/components/ui";

export function MenuDrawer(props: IconButtonProps) {
  // ** Props
  const { ...restProps } = props;

  const [open, setOpen] = React.useState(false);
  const closeHandler = () => {
    setOpen(false);
  };
  const openHandler = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton onClick={openHandler} {...restProps}>
        <Menu />
      </IconButton>
      <Drawer
        open={open}
        onClose={closeHandler}
        anchor="left"
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
            borderBottom={1}
            borderColor={(theme) => theme.palette.divider}
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
          >
            <IconButton onClick={closeHandler}>
              <Close />
            </IconButton>
          </Box>
          <Box flex={1} overflow={"hidden"}>
            <ScrollView>
              <List component={"nav"} disablePadding>
                <MenuLink icon={<HomeOutlined />} label="Home" to={"/"} />
                <MenuGroup icon={<ArticleOutlined />} label="Pages">
                  <MenuLink label="Not Found" to={"/404"} />
                  <MenuLink label="Account" to={"/account"} />
                  <MenuLink label="Picture" to={"/picture"} />
                </MenuGroup>
                <MenuGroup icon={<FeedOutlined />} label="Form">
                  <MenuLink label="Input" to={"/input"} />
                  <MenuLink label="Upload" to={"/upload"} />
                  <MenuLink label="Autocomplete" to={"autocomplete"} />
                  <MenuLink label="TinyMCE" to={"tinymce"} />
                </MenuGroup>
                <MenuGroup label="Table" icon={<GridOnOutlined />}>
                  <MenuLink label="Data Grid" to={"/data-grid"} />
                  <MenuLink label="Posthog Insights" to={"/posthog-insights"} />
                  <MenuLink label="Posthog Events" to={"/posthog-events"} />
                </MenuGroup>
                <MenuGroup label="List" icon={<FormatListNumberedOutlined />}>
                  <MenuLink label="Infinite List" to={"/infinite-list"} />
                  <MenuLink label="Virtualized List" to={"/virtualized-list"} />
                </MenuGroup>
                <MenuGroup label="Lab" icon={<ScienceOutlined />}>
                  <MenuLink label="Fabric" to="/fabric" />
                  <MenuLink label="Swiper" to="/swiper" />
                  <MenuLink label="SSO" to="/sso-login" />
                  <MenuLink label="Blank" to="/blank" />
                </MenuGroup>
                <MenuGroup label="Charts" icon={<DataSaverOffOutlined />}>
                  <MenuLink label="Charts" to="/charts" />
                </MenuGroup>
              </List>
            </ScrollView>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
