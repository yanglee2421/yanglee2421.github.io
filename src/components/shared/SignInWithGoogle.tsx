import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/api/firebase/app";
import { Button } from "@mui/material";
import { Google } from "@/components/svg/Google";

export function SignInWithGoogle() {
  return (
    <Button
      onClick={() => {
        signInWithPopup(auth, googleAuthProvider);
      }}
      size="large"
      variant="outlined"
      color="inherit"
      fullWidth
      startIcon={<Google width={"1em"} height={"1em"} />}
      sx={{
        borderColor(theme) {
          return theme.palette.divider;
        },
        color(theme) {
          return theme.palette.text.secondary;
        },
      }}
    >
      Sign in with Google
    </Button>
  );
}
