import { fetchUserByFirebase, netlify } from "@/api/netlify";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { calculateLocale, calculateLocalePathname } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useLocation, useParams } from "react-router";
import { NavigateToHome, NavigateToLogin } from "./nav";

const useSyncLanguage = () => {
  const params = useParams();
  const { i18n } = useTranslation();
  const fallbackLang = useLocalStore((store) => store.fallbackLang);

  const langInPath = params.lang;
  if (!langInPath) throw new Error("Invalid lang params");

  const lang = calculateLocale(fallbackLang, langInPath);

  const changeLanguage = React.useEffectEvent((lang: string) => {
    if (!lang) return;

    i18n.changeLanguage(lang);
    useLocalStore.setState((draft) => {
      draft.fallbackLang = lang;
    });
  });

  React.useEffect(() => {
    changeLanguage(lang);
  }, [lang]);
};

export const LangRoute = () => {
  const params = useParams();
  const location = useLocation();
  const fallbackLang = useLocalStore((store) => store.fallbackLang);
  useSyncLanguage();

  const langInPath = params.lang;
  if (!langInPath) throw new Error("Invalid params lang");

  const lang = calculateLocale(fallbackLang, langInPath);

  if (lang === langInPath) {
    return <Outlet />;
  }

  return (
    <Navigate
      to={{
        pathname: calculateLocalePathname(location.pathname, lang),
        search: location.search,
        hash: location.hash,
      }}
      state={location.state}
      replace
    />
  );
};

export const GuestGuard = () => {
  const user = useCurrentUser();

  return user ? <NavigateToHome /> : <Outlet />;
};

export const AuthGuard = () => {
  const user = useCurrentUser();
  const netlifyToken = useLocalStore((s) => s.netlifyToken);
  const setNetlifyToken = useLocalStore.setState;

  const auth = useQuery({
    ...fetchUserByFirebase({
      data: {
        firebaseId: user?.uid || "",
        name: user?.displayName || "",
      },
    }),
    enabled: !!user?.uid,
  });

  React.useInsertionEffect(() => {
    if (!auth.data?.data.token) return;
    setNetlifyToken({ netlifyToken: auth.data.data.token });
  }, [auth.data?.data.token]);

  React.useInsertionEffect(() => {
    if (!netlifyToken) return;

    const id = netlify.interceptors.request.use((config) => {
      config.headers.setAuthorization(`Bearer ${netlifyToken}`, false);
      return config;
    });

    return () => {
      netlify.interceptors.request.eject(id);
    };
  }, [netlifyToken]);

  return user ? <Outlet /> : <NavigateToLogin />;
};
