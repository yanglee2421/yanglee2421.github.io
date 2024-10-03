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
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { AclProvider } from "@/hooks/useAcl";
import { defineAbilityFor } from "@/lib/defineAbilityFor";
import { useIsDark } from "@/hooks/dom/useIsDark";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { useThemeStore, type Mode } from "@/hooks/store/useThemeStore";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";

function modeToHasSelector(mode: Mode, isDark: boolean) {
  switch (mode) {
    case "system":
      return isDark;

    case "dark":
      return true;
    case "light":
      return false;
  }
}

const LANGS = ["en", "zh"];

export function RootRoute() {
  const outlet = useOutlet();
  const navigation = useNavigation();
  const currentUser = useCurrentUser();
  const isDark = useIsDark();
  const { reset } = useQueryErrorResetBoundary();
  const mode = useThemeStore((s) => s.mode);
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
    const darkSelector = "dark";
    const hasSelector = modeToHasSelector(mode, isDark);

    if (hasSelector) {
      document.documentElement.classList.add(darkSelector);
      return;
    }

    document.documentElement.classList.remove(darkSelector);
  }, [isDark, mode]);

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
      <link
        rel="icon"
        type="image/svg+xml"
        href={isDark ? "/favicon-dark.svg" : "/favicon.svg"}
      />
      <ScrollRestoration />

      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ error, resetErrorBoundary }) => (
          <Card className="m-6 rounded bg-red-200 px-5 py-2 text-white">
            <h1 className="text-3xl">Error</h1>
            <p className="mb-1.5 text-red-500">{error.message}</p>
            <Button
              onClick={resetErrorBoundary}
              variant={"destructive"}
              className="uppercase"
            >
              reset
            </Button>
          </Card>
        )}
      >
        <React.Suspense fallback={<Loading />}>
          <AclProvider
            value={defineAbilityFor(currentUser ? "admin" : "guest")}
          >
            {outlet}
            <Toaster />
          </AclProvider>
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
}
