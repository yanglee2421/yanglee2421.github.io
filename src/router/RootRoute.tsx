import NProgress from "nprogress";
import {
  useMatches,
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
import { Forbidden } from "./Forbidden";

export function RootRoute() {
  const matches = useMatches();
  const outlet = useOutlet();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams({ lang: "en" });
  const { authValue, updateAuth } = useAuthStore(
    useShallow((store) => {
      return {
        authValue: store.value,
        updateAuth: store.update,
      };
    })
  );

  const currentRoute = matches[matches.length - 1];
  const routeHandle = Object(currentRoute.handle);
  const acl = defineAbilityFor(authValue.auth.currentUser ? "admin" : "");
  const lang = searchParams.get("lang");

  React.useEffect(() => {
    switch (navigation.state) {
      case "idle":
        NProgress.done();
        break;
      case "submitting":
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
    if (!routeHandle.title) {
      return;
    }

    if (typeof routeHandle.title === "string") {
      document.title = routeHandle.title;
    }
  }, [routeHandle.title]);

  return (
    <AclContext.Provider value={acl}>
      {(() => {
        if (!currentRoute) {
          return null;
        }

        switch (String(routeHandle.auth)) {
          case "none":
            return outlet;

          case "guest":
            if (authValue.auth.currentUser) {
              return <HomeRoute></HomeRoute>;
            }

            return outlet;

          case "auth":
          default:
            if (!authValue.auth.currentUser) {
              return <LoginRoute></LoginRoute>;
            }

            if (
              acl.can(
                String(routeHandle.aclAction || "read"),
                String(routeHandle.aclSubject || "fallback")
              )
            ) {
              return outlet;
            }

            return <Forbidden></Forbidden>;
        }
      })()}
    </AclContext.Provider>
  );
}
