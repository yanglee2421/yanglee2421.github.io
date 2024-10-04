import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";
import {
  useOutlet,
  useNavigation,
  ScrollRestoration,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";

const LANGS = ["en", "zh"];

export function RootRoute() {
  const outlet = useOutlet();
  const navigation = useNavigation();
  const params = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();
  const fallbackLang = useLocaleStore((s) => s.fallbackLang);
  const setFallbackLang = useLocaleStore((s) => s.set);

  React.useEffect(() => {
    if (!LANGS.includes(params.lang || "")) {
      return;
    }

    setFallbackLang((prev) => ({
      fallbackLang: params.lang || prev.fallbackLang,
    }));
    i18n.changeLanguage(params.lang);
  }, [params.lang, i18n, setFallbackLang]);

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

  if (!LANGS.includes(params.lang || "")) {
    return (
      <Navigate
        to={{
          pathname: `/${fallbackLang + location.pathname}`,
          search: location.search,
          hash: location.hash,
        }}
        state={location.state}
        replace
      />
    );
  }

  return (
    <>
      <ScrollRestoration />
      {outlet}
    </>
  );
}
