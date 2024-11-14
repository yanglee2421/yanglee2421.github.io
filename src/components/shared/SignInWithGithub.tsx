import { getAuth, signInWithPopup } from "firebase/auth";
import { app, githubAuthProvider } from "@/api/firebase/app";
import { Button } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export function SignInWithGithub() {
  return (
    <Button
      onClick={() => {
        signInWithPopup(getAuth(app), githubAuthProvider);
      }}
      variant={"contained"}
      color="inherit"
      size="large"
      fullWidth
      startIcon={<GitHub />}
      sx={{ bgcolor: "black", color: "white" }}
    >
      Sign in with Github
    </Button>
  );
}
