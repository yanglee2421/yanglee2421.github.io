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
import { Typography } from "@mui/material";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";

const LANGS = new Set(["en", "zh"]);
const FALLBACK_LANG = "en";
const getMatchedLang = (path = "", state: string) => {
  if (LANGS.has(path)) {
    return path;
  }

  if (LANGS.has(state)) {
    return state;
  }

  return FALLBACK_LANG;
};

export function RootRoute() {
  const navigation = useNavigation();
  const hasHydrated = React.useSyncExternalStore(
    (onStoreChange) => useLocaleStore.persist.onFinishHydration(onStoreChange),
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

  if (!hasHydrated) {
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>;
  }

  return <Outlet />;
}

function Outlet() {
  const outlet = useOutlet();
  const params = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const setStoreLang = useLocaleStore((s) => s.set);
  const storeLang = useLocaleStore((s) => s.fallbackLang);
  const matchedLang = getMatchedLang(params.lang, storeLang);

  React.useEffect(() => {
    // Avoid unnecssary dispatch render
    if (matchedLang === storeLang) {
      return;
    }

    // Memorize matched lang to storage
    setStoreLang(() => ({
      fallbackLang: matchedLang,
    }));

    // Sync i18n & store
    i18n.changeLanguage(matchedLang);
  }, [matchedLang, storeLang, setStoreLang, i18n]);

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
