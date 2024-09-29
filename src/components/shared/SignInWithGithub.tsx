import { getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { app, githubAuthProvider } from "@/api/firebase/app";
import { Button } from "@/components/ui/button";

export function SignInWithGithub() {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await signInWithPopup(getAuth(app), githubAuthProvider);
        });
      }}
      disabled={isPending}
      variant={"outline"}
      className="block w-full"
    >
      Sign in with Github
    </Button>
  );
}
