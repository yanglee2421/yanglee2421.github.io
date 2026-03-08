import { useLocalStorage } from "@vueuse/core";
import type { RouteRecordRaw } from "vue-router";
import { localeService } from "../shared/locale";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    children: [
      {
        path: "",
        redirect: (to) => {
          const storedLocaleRef = useLocalStorage("locale", "en");
          localeService.setLocale(storedLocaleRef.value);
          storedLocaleRef.value = localeService.getLocale();
          return localeService.resolvePathname(to.path);
        },
      },
      {
        path: ":lang",
        component: () => import("./LangGuard.vue"),
        beforeEnter: (to, _, next) => {
          const lang = to.params.lang as string;
          const storedLocaleRef = useLocalStorage("locale", "en");
          localeService.setLocale(storedLocaleRef.value);
          localeService.setLocale(lang);
          const locale = localeService.getLocale();
          storedLocaleRef.value = locale;

          if (locale === lang) {
            next();
            return;
          }

          next({
            path: localeService.resolvePathname(to.path),
          });
        },
        children: [
          {
            name: "not-found",
            path: ":pathMatch(.*)*",
            component: () => import("../pages/NotFoundPage.vue"),
          },
          {
            name: "home",
            path: "",
            component: () => import("../pages/HomePage.vue"),
          },
          {
            name: "about",
            path: "about",
            component: () => import("../pages/AboutPage.vue"),
          },
        ],
      },
    ],
  },
];
