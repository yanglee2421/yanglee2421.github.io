import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleAuthProvider } from "@/api/firebase/app";
import { Button } from "@/components/ui/button";

export function SignInWithGoogle() {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await signInWithPopup(auth, googleAuthProvider);
        });
      }}
      disabled={isPending}
      variant={"outline"}
      className="block w-full"
    >
      Sign in with Google
    </Button>
  );
}
