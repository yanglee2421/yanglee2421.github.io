import NProgress from "nprogress";
import { useOutlet, useSearchParams, useNavigation } from "react-router-dom";
import React from "react";
import { useAuthStore } from "@/hooks/store";
import { defineAbilityFor, AclContext } from "@/configs/acl";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/api/firebase";
import { useTranslation } from "react-i18next";

export function RootRoute() {
  const outlet = useOutlet();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams({ lang: "en" });
  const authValue = useAuthStore((store) => store.value);
  const updateAuth = useAuthStore((store) => store.update);

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

  return (
    <AclContext.Provider
      value={defineAbilityFor(authValue.auth.currentUser ? "admin" : "guest")}
    >
      {outlet}
    </AclContext.Provider>
  );
}
