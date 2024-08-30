import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/api/firebase/app";

export function SignInWithGoogle() {
  const mutation = useMutation({
    mutationFn() {
      return signInWithPopup(getAuth(app), new GoogleAuthProvider());
    },
  });

  return (
    <button
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
    >
      Sign in with Google
    </button>
  );
}
