import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/api/firebase/app";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";

export function SignInWithGoogle() {
  return (
    <Button
      onClick={() => {
        signInWithPopup(auth, googleAuthProvider);
      }}
      variant={"outlined"}
      size="large"
      fullWidth
      startIcon={<Google />}
    >
      Sign in with Google
    </Button>
  );
}
