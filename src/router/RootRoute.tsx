import NProgress from "nprogress";
import React from "react";
import {
  Navigate,
  ScrollRestoration,
  useLocation,
  useNavigation,
  useOutlet,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";

const LANGS = new Set(["en", "zh"]);
const getLang = (path: string | undefined, state: string) => {
  const fallbackLang = LANGS.has(state) ? state : "en";

  if (!path) {
    return fallbackLang;
  }

  if (!LANGS.has(path)) {
    return fallbackLang;
  }

  return path;
};

export function RootRoute() {
  const outlet = useOutlet();
  const navigation = useNavigation();
  const params = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();
  const storeLang = useLocaleStore((s) => s.fallbackLang);
  const setStoreLang = useLocaleStore((s) => s.set);
  const lang = getLang(params.lang, storeLang);

  React.useEffect(() => {
    setStoreLang(() => ({
      fallbackLang: lang,
    }));
    i18n.changeLanguage(lang);
  }, [lang, i18n, setStoreLang]);

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

  if (lang !== params.lang) {
    return (
      <Navigate
        to={{
          pathname: `/${lang + location.pathname}`,
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
