import NProgress from "nprogress";
import {
  useMatches,
  Navigate,
  useOutlet,
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import React from "react";
import { useAuthStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";
import { defineAbilityFor, AclContext } from "@/configs/acl";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/api/firebase";
import { HomeRoute } from "./HomeRoute";
import { LoginRoute } from "./LoginRoute";
import { useTranslation } from "react-i18next";

export function RootRoute() {
  const matches = useMatches();
  const outlet = useOutlet();
  const { authValue, updateAuth } = useAuthStore(
    useShallow((store) => {
      return {
        authValue: store.value,
        updateAuth: store.update,
      };
    })
  );

  const acl = defineAbilityFor(authValue.auth.currentUser ? "admin" : "");

  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams({
    lang: "en",
  });
  const lang = searchParams.get("lang");

  const navigation = useNavigation();

  React.useEffect(() => {
    switch (navigation.state) {
      case "idle":
        NProgress.done();
        break;
      case "loading":
        NProgress.start();
        break;
      default:
    }
  }, [navigation.state]);

  React.useEffect(() => {
    if (typeof lang === "string") {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  React.useEffect(() => {
    return onAuthStateChanged(getAuth(app), () => {
      updateAuth();
    });
  }, [updateAuth]);

  React.useEffect(() => {
    const currentRoute = matches[matches.length - 1];

    if (!currentRoute) {
      return;
    }

    const title = Reflect.get(currentRoute.handle || {}, "title");

    if (!title) {
      return;
    }

    if (typeof title === "string") {
      document.title = title;
    }
  }, [matches]);

  return (
    <AclContext.Provider value={acl}>
      {(() => {
        const currentRoute = matches[matches.length - 1];

        if (!currentRoute) {
          return null;
        }

        const handle = Object(currentRoute.handle);

        switch (Reflect.get(handle, "auth")) {
          case "none":
            return outlet;

          case "guest":
            if (authValue.auth.currentUser) {
              return <HomeRoute></HomeRoute>;
            }

            return outlet;

          case "auth":
          default:
            // Not logged in
            if (!authValue.auth.currentUser) {
              return <LoginRoute></LoginRoute>;
            }

            // Authorized pass
            if (
              acl.can(
                String(Reflect.get(handle, "aclAction") || "read"),
                String(Reflect.get(handle, "aclSubject") || "fallback")
              )
            ) {
              return outlet;
            }

            // Not authorized
            return <Navigate to="/403"></Navigate>;
        }
      })()}
    </AclContext.Provider>
  );
}
