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
  Divider,
} from "@mui/material";
import { AutoAwesomeOutlined, CloseOutlined } from "@mui/icons-material";

// React Imports
import React from "react";

// Components Imports
import { ScrollView } from "@/components/ui";

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
        variant="persistent"
        hideBackdrop
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
              <Typography
                variant="h6"
                fontWeight={600}
                textTransform={"uppercase"}
              >
                THEME CUSTOMIZER
              </Typography>
              <Typography color="secondary">
                Customize & Preview in Real Time
              </Typography>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <Box flex={1} overflow={"hidden"}>
            <ScrollView>
              <Box height={1000} p={4}>
                <Typography
                  variant="caption"
                  component={"p"}
                  mb={4}
                  color={(theme) => theme.palette.text.disabled}
                  textTransform={"uppercase"}
                >
                  THEMING
                </Typography>

                {/* Skin */}
                <Box mb={4}>
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

                {/* Mode */}
                <Box mb={4}>
                  <Typography>Mode</Typography>
                  <RadioGroup
                    value={"default"}
                    onChange={(evt, v) => {
                      console.log(evt, v);
                    }}
                    row
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label={<Typography variant="body2">Light</Typography>}
                      value={"light"}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label={<Typography variant="body2">Dark</Typography>}
                      value={"dark"}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label={<Typography variant="body2">Auto</Typography>}
                      value={"auto"}
                    />
                  </RadioGroup>
                </Box>

                {/*  */}
                <Divider sx={{ m: 0 }}></Divider>

                {/* Layout */}
                <Typography
                  variant="caption"
                  component={"p"}
                  mb={4}
                  color={(theme) => theme.palette.text.disabled}
                  textTransform={"uppercase"}
                >
                  layout
                </Typography>
              </Box>
            </ScrollView>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
