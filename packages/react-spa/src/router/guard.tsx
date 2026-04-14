import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { HOME_PATH, LOGIN_PATH } from "@/lib/constants";
import { LocaleContext, useLocale } from "@/shared/LocaleContext";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router";

const useSyncLanguage = () => {
  const locale = useLocale();
  const { i18n } = useTranslation();

  const changeLanguage = React.useEffectEvent((lang: string) => {
    if (!lang) return;

    i18n.changeLanguage(lang);
    useLocalStore.setState((draft) => {
      draft.fallbackLang = lang;
    });
  });

  React.useEffect(() => {
    changeLanguage(locale);
  }, [locale]);
};

export const LangRoute = () => {
  useSyncLanguage();
  const localeService = React.use(LocaleContext);

  const params = useParams();
  const location = useLocation();
  const fallbackLang = useLocalStore((store) => store.fallbackLang);

  const langInPath = params.lang!;
  localeService.setLocale(fallbackLang);
  localeService.setLocale(langInPath);
  const locale = localeService.getLocale();

  if (Object.is(langInPath, locale)) {
    return <Outlet />;
  }

  return (
    <Navigate
      to={{
        pathname: localeService.resolvePathname(location.pathname),
        search: location.search,
        hash: location.hash,
      }}
      state={location.state}
      replace
    />
  );
};

export const NavigateToHome = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <Navigate
      to={{
        pathname: searchParams.get("redirect_uri") || HOME_PATH,
        search: location.search,
        hash: location.hash,
      }}
      state={location.state}
      replace
    />
  );
};

export const NavigateToLogin = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const search = new URLSearchParams(searchParams);
  search.set("redirect_uri", location.pathname);

  return (
    <Navigate
      to={{
        pathname: LOGIN_PATH,
        search: search.toString(),
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

  return user ? <Outlet /> : <NavigateToLogin />;
};
