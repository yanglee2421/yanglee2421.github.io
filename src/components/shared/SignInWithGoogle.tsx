import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/api/firebase/app";
import { Google } from "@/components/svg/Google";

export function SignInWithGoogle() {
  const mutation = useMutation({
    mutationFn() {
      return signInWithPopup(getAuth(app), new GoogleAuthProvider());
    },
  });

  return (
    <Button
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
      startIcon={<Google width={26} height={26} />}
      sx={{
        fontWeight: 400,
        "& .MuiButton-startIcon": {
          marginInlineEnd: 3,
        },
      }}
    >
      Sign in with Google
    </Button>
  );
}
