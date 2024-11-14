import { Typography } from "@mui/material";
import { ReactLogo } from "@/components/svg/ReactLogo";
import { Google } from "@/components/svg/Google";
import { Github } from "@/components/svg/Github";

export function Component() {
  return (
    <>
      <Typography variant="h4">Home</Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        suscipit placeat dolores quos rem eaque assumenda molestias quibusdam
        odio quasi repudiandae, tenetur ipsa facilis perferendis, provident
        expedita. Expedita, itaque recusandae.
      </Typography>
      <Github />
      <Google />
      <ReactLogo />
    </>
  );
}
