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
import { AclProvider } from "@/hooks/useAcl";
import { defineAbilityFor } from "@/libs/defineAbilityFor";
import { useIsDark } from "@/hooks/dom/useIsDark";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";
import { useThemeStore, type Mode } from "@/hooks/store/useThemeStore";
import { Toaster } from "@/components/ui/toaster";

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

export function RootRoute() {
  const outlet = useOutlet();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams({ lang: "en" });
  const currentUser = useCurrentUser();
  const isDark = useIsDark();
  const { reset } = useQueryErrorResetBoundary();
  const lang = searchParams.get("lang");
  const mode = useThemeStore((s) => s.mode);
  const hasHydrated = React.useSyncExternalStore(
    (onStateChange) => useThemeStore.persist.onFinishHydration(onStateChange),
    () => useThemeStore.persist.hasHydrated(),
    () => false,
  );

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

  React.useEffect(() => {
    if (!lang) {
      return;
    }

    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  if (!hasHydrated) {
    return <p className="animate-pulse text-center capitalize">loading....</p>;
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
          <div className="m-6 rounded bg-red-200 px-5 py-2 text-white">
            <title>Error</title>
            <h1 className="text-3xl">Error</h1>
            <p className="mb-1.5 text-red-500">{error.message}</p>
            <button onClick={resetErrorBoundary} className="btn-red uppercase">
              reset
            </button>
          </div>
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
