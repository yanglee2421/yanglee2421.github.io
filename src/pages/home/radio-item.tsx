// MUI Imports
import { Box, Avatar, Typography, Radio } from "@mui/material";

export function RadioItem() {
  return (
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
        color="secondary"
        mt={1}
        mb={"auto"}
        overflow={"hidden"}
        maxHeight={(theme) => {
          return `calc(${theme.typography.body2.lineHeight}em * 4)`;
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, possimus
        itaque. Suscipit sequi, minus dignissimos reiciendis cumque rem
        voluptatem nesciunt, iure, in ipsam quasi quod a. Adipisci alias
        quibusdam eveniet.
      </Typography>
      <Radio value={"one"} />
    </Box>
  );
}
