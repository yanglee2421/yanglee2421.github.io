import NProgress from "nprogress";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useOutlet,
  useSearchParams,
  useNavigation,
  ScrollRestoration,
} from "react-router-dom";
import { useCurrentUser } from "@/hooks/store/useCurrentUser";
import { AclContext } from "@/hooks/useAcl";
import { defineAbilityFor } from "@/libs/defineAbilityFor";

export function RootRoute() {
  const outlet = useOutlet();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams({ lang: "en" });

  const currentUser = useCurrentUser();

  const lang = searchParams.get("lang");

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
