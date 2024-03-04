import { getAuth, onAuthStateChanged } from "firebase/auth";
import NProgress from "nprogress";
import React from "react";
import { useTranslation } from "react-i18next";
import { useOutlet, useSearchParams, useNavigation } from "react-router-dom";
import { app } from "@/api/firebase/firebase";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { AclContext } from "@/hooks/useAcl";
import { defineAbilityFor } from "@/utils/defineAbilityFor";

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
