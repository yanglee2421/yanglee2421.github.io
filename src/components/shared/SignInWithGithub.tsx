import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import React from "react";
import { app } from "@/api/firebase/app";

export function SignInWithGithub() {
  const [, action, isPending] = React.useActionState(() => {
    return signInWithPopup(getAuth(app), new GithubAuthProvider());
  }, null);

  return (
    <button
      onClick={() => {
        React.startTransition(action);
      }}
      disabled={isPending}
    >
      Sign in with Github
    </button>
  );
}
