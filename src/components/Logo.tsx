import { Icon, Typography } from "@mui/material";
import { Materio } from "./svg/Materio";

export const Logo = () => {
  return (
    <>
      <Icon fontSize="large" color="primary">
        <Materio fontSize="inherit" />
      </Icon>
      <Typography
        component={"span"}
        variant="h6"
        sx={{
          fontSize: (t) => t.spacing(5),
          fontWeight: 600,
          textTransform: "uppercase",
          color: (t) => t.palette.text.primary,
        }}
      >
        github io
      </Typography>
    </>
  );
};
