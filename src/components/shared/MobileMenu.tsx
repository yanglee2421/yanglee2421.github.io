import {
  CloseOutlined,
  MenuOutlined,
  HomeOutlined,
  TabOutlined,
  DataUsageOutlined,
} from "@mui/icons-material";
import { IconButton, Drawer, Box, List } from "@mui/material";
import React from "react";

import { ScrollView } from "@/components/ui/ScrollView";

import { MenuLink } from "./MenuLink";

import type { IconButtonProps } from "@mui/material";

export function MobileMenu(props: IconButtonProps) {
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
                <MenuLink
                  label="Blank"
                  to="/blank"
                  icon={<TabOutlined></TabOutlined>}
                ></MenuLink>
                <MenuLink
                  label="Charts"
                  to="/charts"
                  icon={<DataUsageOutlined></DataUsageOutlined>}
                ></MenuLink>
              </List>
            </ScrollView>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
