import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useOutlet,
  useSearchParams,
  useNavigation,
  ScrollRestoration,
} from "react-router-dom";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { AclContext } from "@/hooks/useAcl";
import { defineAbilityFor } from "@/libs/defineAbilityFor";

export function RootRoute() {
  const outlet = useOutlet();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams({ lang: "en" });
  const currentUser = useCurrentUser();

  React.useEffect(() => {
    switch (navigation.state) {
      case "submitting":
      case "loading":
        NProgress.start();
        break;
      case "idle":
      default:
        NProgress.done();
    }
  }, [navigation.state]);

  const lang = searchParams.get("lang");

  React.useEffect(() => {
    if (!lang) {
      return;
    }

    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <AclContext.Provider
      value={defineAbilityFor(currentUser ? "admin" : "guest")}
    >
      {outlet}
      <ScrollRestoration />
    </AclContext.Provider>
  );
}
