import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/api/firebase/app";
import GoogleLogo from "@/assets/images/google.png";

export function SignInWithGoogle() {
  const mutationGoogle = useMutation({
    mutationFn() {
      return signInWithPopup(getAuth(app), new GoogleAuthProvider());
    },
  });

  return (
    <Button
      color="secondary"
      startIcon={<img src={GoogleLogo} alt="Google" width={22}></img>}
      sx={{ "& .MuiButton-startIcon": { marginInlineEnd: 3 } }}
      onClick={() => {
        mutationGoogle.mutate();
      }}
    >
      Sign in with Google
    </Button>
  );
}
