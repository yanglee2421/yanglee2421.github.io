import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { app } from "@/api/firebase/app";

export function SignInWithGoogle() {
  const [, action, isPending] = React.useActionState(() => {
    return signInWithPopup(getAuth(app), new GoogleAuthProvider());
  }, null);

  return (
    <>
      <button onClick={action} disabled={isPending}>
        Sign in with Google
      </button>
      <button
        onClick={() => {
          signInWithPopup(getAuth(app), new GoogleAuthProvider());
        }}
        disabled={isPending}
      >
        Sign in with Google
      </button>
    </>
  );
}
