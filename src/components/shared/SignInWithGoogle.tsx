import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { app } from "@/api/firebase/app";

export function SignInWithGoogle() {
  const [, action, isPending] = React.useActionState(() => {
    return signInWithPopup(getAuth(app), new GoogleAuthProvider());
  }, null);

  return (
    <>
      <button
        onClick={() => {
          React.startTransition(action);
        }}
        disabled={isPending}
      >
        Sign in with Google
      </button>
    </>
  );
}
