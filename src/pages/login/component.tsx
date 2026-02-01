import React from "react";
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
import { devLog } from "@/lib/utils";
import type { AuthProvider } from "@toolpad/core";

const createAuthProviders = (): AuthProvider[] => {
  devLog(false, "run auth create");

  return [
    { id: "google", name: "Google" },
    { id: "github", name: "GitHub" },
  ];
};

export const Component = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LinearProgress />;
  }

  const authProviders = createAuthProviders();

  return (
    <React.Fragment>
      <SignInPage
        providers={authProviders}
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
              error:
                error instanceof Error ? error.message : "An error occurred",
            };
          }
        }}
      />
    </React.Fragment>
  );
};
