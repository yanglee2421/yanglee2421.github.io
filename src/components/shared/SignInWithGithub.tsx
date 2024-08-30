import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { app } from "@/api/firebase/app";

export function SignInWithGithub() {
  const mutation = useMutation({
    mutationFn() {
      return signInWithPopup(getAuth(app), new GithubAuthProvider());
    },
  });

  return (
    <button
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
    >
      Sign in with Github
    </button>
  );
}
