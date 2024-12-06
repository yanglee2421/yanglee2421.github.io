import NProgress from "nprogress";
import React from "react";
import {
  Navigate,
  ScrollRestoration,
  useLocation,
  useNavigation,
  useOutlet,
  useParams,
} from "react-router";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress, Typography } from "@mui/material";
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
    return;
  }

  return (
    <React.Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 6,

            position: "fixed",
            inset: 0,
            zIndex(theme) {
              return theme.zIndex.modal;
            },
          }}
        >
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Box>
      }
    >
      <Outlet />
      <ScrollRestoration />
    </React.Suspense>
  );
}

function Outlet() {
  const outlet = useOutlet();
  const params = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const setStoreLang = useLocaleStore((s) => s.update);
  const storeLang = useLocaleStore((s) => s.fallbackLang);
  const matchedLang = getMatchedLang(params.lang, storeLang);

  React.useEffect(() => {
    setStoreLang({ fallbackLang: matchedLang });
    i18n.changeLanguage(matchedLang);
  }, [setStoreLang, matchedLang, i18n]);

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

  return outlet;
}
