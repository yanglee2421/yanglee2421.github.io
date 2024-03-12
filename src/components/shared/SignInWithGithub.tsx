import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { app } from "@/api/firebase/app";
import { Github } from "@/components/svg/Github";

export function SignInWithGithub() {
  const mutation = useMutation({
    mutationFn() {
      return signInWithPopup(getAuth(app), new GithubAuthProvider());
    },
  });

  return (
    <Button
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
      startIcon={<Github width={26} height={26} />}
      sx={{
        fontWeight: 400,
        "& .MuiButton-startIcon": {
          marginInlineEnd: 3,
        },
      }}
    >
      Sign in with Github
    </Button>
  );
}
