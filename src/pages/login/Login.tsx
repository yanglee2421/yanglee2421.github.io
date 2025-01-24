import { LangToggle } from "@/components/shared/LangToggle";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { SignInWithGithub, SignInWithGoogle } from "@/components/sign";
import { GitHub } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import * as consts from "@/lib/constants";

export function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",

        inlineSize: "100%",
        blockSize: "100%",

        padding: 6,
      }}
    >
      <div>
        <Typography variant="h4" sx={{ marginBlockEnd: 1 }}>
          Login to App
        </Typography>
        <Typography color="secondary">
          Please sign-in to your account and start the adventure
        </Typography>
      </div>
      <Stack spacing={6} sx={{ marginBlockStart: 4 }}>
        <SignInWithGithub />
        <SignInWithGoogle />
        <Stack direction={"row"} spacing={3} useFlexGap>
          <LangToggle />
          <ModeToggle />
          <IconButton href={consts.GITHUB_URL} target={consts.GITHUB_URL}>
            <GitHub />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
