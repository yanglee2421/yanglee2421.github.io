import { Box, IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { LangToggle } from "@/components/shared/LangToggle";
import { UserDropdown } from "@/components/shared/UserDropdonw";
import { ModeToggle } from "@/components/shared/ModeToggle";
import * as consts from "@/lib/constants";

export const AuthHeader = () => {
  return (
    <>
      <Box sx={{ marginInlineStart: "auto" }}></Box>
      <LangToggle />
      <ModeToggle />
      <IconButton href={consts.GITHUB_URL} target={consts.GITHUB_URL}>
        <GitHub />
      </IconButton>
      <UserDropdown />
    </>
  );
};
