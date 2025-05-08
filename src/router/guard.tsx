import { fetchUserByFirebase, netlify } from "@/api/netlify";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { getMatchedLang } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, useLocation, Navigate, Outlet } from "react-router";
import { NavigateToHome, NavigateToLogin } from "./navigate";

export const LangGuard = () => {
  const params = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();
  const setStoreLang = useLocalStore((s) => s.update);
  const storeLang = useLocalStore((s) => s.fallbackLang);
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

  return <Outlet />;
};

export const GuestGuard = () =>
  useCurrentUser() ? <NavigateToHome /> : <Outlet />;

export const AuthGuard = () => {
  const user = useCurrentUser();
  const netlifyToken = useLocalStore((s) => s.netlifyToken);
  const setNetlifyToken = useLocalStore((s) => s.update);

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
