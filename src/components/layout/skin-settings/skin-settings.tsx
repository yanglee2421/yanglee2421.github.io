// MUI Imports
import {
  Drawer,
  IconButton,
  IconButtonProps,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { AutoAwesomeOutlined, CloseOutlined } from "@mui/icons-material";

// React Imports
import React from "react";

// Components Imports
import { Scrollbar } from "@/components";

export function SkinSettings(props: IconButtonProps) {
  // ** Props
  const { ...restProps } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton onClick={handleOpen} {...restProps}>
        <AutoAwesomeOutlined />
      </IconButton>
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: { sm: 400 },
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
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={4}
            borderBottom={1}
            borderColor={(theme) => theme.palette.divider}
          >
            <Box>
              <Typography variant="h6">THEME CUSTOMIZER</Typography>
              <Typography color="secondary">
                Customize & Preview in Real Time
              </Typography>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <Box flex={1} overflow={"hidden"}>
            <Scrollbar>
              <Box height={1000} p={4}>
                <Typography
                  variant="caption"
                  color={(theme) => theme.palette.text.disabled}
                >
                  THEMING
                </Typography>
                <Typography>Skin</Typography>
                <RadioGroup
                  value={"default"}
                  onChange={(evt, v) => {
                    console.log(evt, v);
                  }}
                  row
                >
                  <FormControlLabel
                    control={<Radio />}
                    label={<Typography variant="body2">Default</Typography>}
                    value={"default"}
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label={<Typography variant="body2">Bordered</Typography>}
                    value={"bordered"}
                  />
                </RadioGroup>
              </Box>
            </Scrollbar>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
