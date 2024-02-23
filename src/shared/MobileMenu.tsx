// MUI Imports
import {
  CloseOutlined,
  MenuOutlined,
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
import { ScrollView } from "@/components/ui";
import { MenuGroup } from "./MenuGroup";
import { MenuLink } from "./MenuLink";

export function MobileMenu(props: IconButtonProps) {
  // ** Props
  const { ...restProps } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        {...restProps}
      >
        <MenuOutlined></MenuOutlined>
      </IconButton>
      <Drawer open={open} onClose={handleClose} anchor="left">
        <Box
          display={"flex"}
          flexDirection={"column"}
          boxSizing={"border-box"}
          width={{ xs: 240, sm: 320 }}
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
            <IconButton onClick={handleClose}>
              <CloseOutlined></CloseOutlined>
            </IconButton>
          </Box>
          <Box flex={1} overflow={"hidden"}>
            <ScrollView>
              <List component={"nav"} disablePadding>
                <MenuLink
                  icon={<HomeOutlined></HomeOutlined>}
                  label="Home"
                  to={"/"}
                ></MenuLink>
                <MenuGroup
                  icon={<ArticleOutlined></ArticleOutlined>}
                  label="Pages"
                >
                  <MenuLink label="Not Found" to={"/404"}></MenuLink>
                </MenuGroup>
                <MenuGroup icon={<FeedOutlined></FeedOutlined>} label="Form">
                  <MenuLink label="Input" to={"/input"}></MenuLink>
                  <MenuLink label="Upload" to={"/upload"}></MenuLink>
                  <MenuLink label="Autocomplete" to={"autocomplete"}></MenuLink>
                  <MenuLink label="TinyMCE" to={"tinymce"}></MenuLink>
                </MenuGroup>
                <MenuGroup
                  label="Table"
                  icon={<GridOnOutlined></GridOnOutlined>}
                >
                  <MenuLink label="Table" to={"/table"}></MenuLink>
                </MenuGroup>
                <MenuGroup
                  label="List"
                  icon={
                    <FormatListNumberedOutlined></FormatListNumberedOutlined>
                  }
                >
                  <MenuLink
                    label="Virtualized List"
                    to={"/virtualized-list"}
                  ></MenuLink>
                </MenuGroup>
                <MenuGroup
                  label="Lab"
                  icon={<ScienceOutlined></ScienceOutlined>}
                >
                  <MenuLink label="Transition" to="/transition"></MenuLink>
                  <MenuLink label="swiper" to="/swiper"></MenuLink>
                  <MenuLink label="Blank" to="/blank"></MenuLink>
                </MenuGroup>
                <MenuGroup
                  label="Charts"
                  icon={<DataSaverOffOutlined></DataSaverOffOutlined>}
                >
                  <MenuLink label="Charts" to="/charts"></MenuLink>
                </MenuGroup>
              </List>
            </ScrollView>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
