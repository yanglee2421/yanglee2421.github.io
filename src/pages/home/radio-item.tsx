// MUI Imports
import { Box, Avatar, Typography, Radio } from "@mui/material";

// Utils Imports
import { stringToColor } from "@/utils";

export function RadioItem(props: RadioItemProps) {
  // ** Props
  const { checked, value, title, desc, name, ...restProps } = props;

  const nameList = name.split(" ");
  const firstName = nameList.at(0) || "";
  const lastName = nameList.at(1) || "";
  const avatarText = (firstName.at(0) || "") + (lastName.at(0) || "");

  return (
    <Box
      component={"label"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      height={"100%"}
      p={2}
      border={"1px solid"}
      borderColor={(theme) => {
        return checked ? theme.palette.primary.main : theme.palette.divider;
      }}
      borderRadius={1}
      textAlign={"center"}
      sx={{
        cursor: "pointer",
      }}
      {...restProps}
    >
      <Avatar sx={{ width: 64, height: 64, bgcolor: stringToColor(name) }}>
        {avatarText}
      </Avatar>
      <Typography
        mt={2}
        fontWeight={500}
        overflow={"hidden"}
        maxHeight={(theme) => {
          return `calc(${theme.typography.body1.lineHeight}em * 1)`;
        }}
      >
        {title}
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
        {desc}
      </Typography>
      <Radio value={value} />
    </Box>
  );
}

export interface RadioItemProps {
  checked: boolean;
  value: string;
  title: string;
  desc: string;
  name: string;
}
