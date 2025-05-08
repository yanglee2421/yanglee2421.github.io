import { SignInPage } from "@toolpad/core";
import { LinearProgress } from "@mui/material";
import { useNavigation } from "react-router";
import { getAuth, signInWithPopup } from "firebase/auth";
import {
  app,
  auth,
  githubAuthProvider,
  googleAuthProvider,
} from "@/api/firebase/app";

export const Component = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LinearProgress />;
  }

  return (
    <SignInPage
      providers={[
        { id: "google", name: "Google" },
        { id: "github", name: "GitHub" },
      ]}
      signIn={async (provider) => {
        try {
          if (provider.id === "google") {
            await signInWithPopup(auth, googleAuthProvider);
          }
          if (provider.id === "github") {
            await signInWithPopup(getAuth(app), githubAuthProvider);
          }

          return { success: "" };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : "An error occurred",
          };
        }
      }}
    />
  );
};
