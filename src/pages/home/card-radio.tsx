// MUI Imports
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Typography,
  useTheme,
} from "@mui/material";

// React Imports
import React from "react";

export function CardRadio() {
  const [value, setValue] = React.useState("one");
  const handleChange: RadioGroupProps["onChange"] = (evt, v) => {
    void evt;
    setValue(v);
  };

  const theme = useTheme();
  console.log(theme.typography);

  return (
    <Card>
      <CardContent>
        <RadioGroup value={value} onChange={handleChange}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Box
                component={"label"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                height={"100%"}
                p={2}
                border={"1px solid"}
                borderColor={(theme) =>
                  true ? theme.palette.primary.main : theme.palette.divider
                }
                borderRadius={1}
                textAlign={"center"}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Avatar sx={{ width: 64, height: 64 }}></Avatar>
                <Typography
                  mt={2}
                  fontWeight={500}
                  overflow={"hidden"}
                  maxHeight={(theme) => {
                    return `calc(${theme.typography.body1.lineHeight}em * 1)`;
                  }}
                >
                  Visually Similar Recommendations
                </Typography>
                <Typography
                  variant="body2"
                  mt={1}
                  mb={"auto"}
                  overflow={"hidden"}
                  maxHeight={(theme) => {
                    return `calc(${theme.typography.body2.lineHeight}em * 4)`;
                  }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
                  possimus itaque. Suscipit sequi, minus dignissimos reiciendis
                  cumque rem voluptatem nesciunt, iure, in ipsam quasi quod a.
                  Adipisci alias quibusdam eveniet.
                </Typography>
                <Radio value={"one"} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Box
                component={"label"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                height={"100%"}
                p={2}
                border={(theme) => `1px solid ${theme.palette.divider}`}
                borderRadius={1}
                textAlign={"center"}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Avatar sx={{ width: 64, height: 64 }}></Avatar>
                <Typography
                  mt={2}
                  fontWeight={500}
                  overflow={"hidden"}
                  maxHeight={(theme) => {
                    return `calc(${theme.typography.body1.lineHeight}em * 1)`;
                  }}
                >
                  Collaborative Filtering Recommendations
                </Typography>
                <Typography
                  variant="body2"
                  mt={1}
                  mb={"auto"}
                  overflow={"hidden"}
                  maxHeight={(theme) => {
                    return `calc(${theme.typography.body2.lineHeight}em * 4)`;
                  }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore enim omnis nesciunt expedita earum nihil.
                </Typography>
                <Radio value={"two"} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                height={"100%"}
                border={(theme) => `1px solid ${theme.palette.divider}`}
                textAlign={"center"}
              >
                <p>7891231</p>
                <p
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  typography
                </p>
              </Box>
            </Grid>
          </Grid>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
/**
 * With auto margins, flex items can be centered, spaced away or packed into sub-groups.
 * Unlike justify-content, which is applied to the flex container, auto margins go on flex items.
 * They work by consuming all free space in the specified direction.
 */
