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
const getMatchedLang = (path: string | undefined, state: string) => {
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
  const hasHydrated = React.useSyncExternalStore(
    (onStateChange) => useLocaleStore.persist.onFinishHydration(onStateChange),
    () => useLocaleStore.persist.hasHydrated(),
    () => false,
  );

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
    if (!hasHydrated) {
      return;
    }

    // Get matched lang utill hydrate finish
    const matchedLang = getMatchedLang(params.lang, storeLang);

    // Avoid unnecssary dispatch render
    if (matchedLang === storeLang) {
      return;
    }

    // Memorize matched lang to storage
    setStoreLang(() => ({
      fallbackLang: matchedLang,
    }));

    // Sync lang in i18n & lang in store
    i18n.changeLanguage(matchedLang);
  }, [hasHydrated, params.lang, storeLang, setStoreLang, i18n]);

  if (!hasHydrated) {
    return <p>Loading...</p>;
  }

  const matchedLang = getMatchedLang(params.lang, storeLang);

  if (matchedLang !== params.lang) {
    return (
      <Navigate
        to={{
          pathname: `/${matchedLang + location.pathname}`,
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
