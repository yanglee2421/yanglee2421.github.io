import { SignInWithGithub } from "@/components/shared/SignInWithGithub";
import { SignInWithGoogle } from "@/components/shared/SignInWithGoogle";
import { Box, Paper, Stack } from "@mui/material";

export function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100dvh",
      }}
    >
      <Paper sx={{ padding: 6 }}>
        <Stack spacing={6}>
          <SignInWithGithub />
          <SignInWithGoogle />
        </Stack>
      </Paper>
    </Box>
  );
}
