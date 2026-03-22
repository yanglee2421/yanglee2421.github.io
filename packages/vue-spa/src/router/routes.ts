import { useLocalStorage } from "@vueuse/core";
import type { RouteRecordRaw } from "vue-router";
import { localeService } from "../shared/locale";

export const createRoutes = (): RouteRecordRaw[] => {
  return [
    {
      path: "/",
      children: [
        {
          name: "index",
          path: "",
          redirect: (to) => {
            const storedLocaleRef = useLocalStorage(
              "locale",
              localeService.getLocale(),
            );
            localeService.setLocale(storedLocaleRef.value);
            storedLocaleRef.value = localeService.getLocale();
            return localeService.resolvePathname(to.path);
          },
        },
        {
          path: ":lang",
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
            {
              path: "",
              children: [
                {
                  path: "",
                  children: [
                    {
                      name: "dashboard",
                      path: "dashboard",
                      component: () => import("@/pages/DashboardPage.vue"),
                    },
                  ],
                  component: () => import("@/components/guard/AuthGuard.vue"),
                },
                {
                  path: "",
                  children: [
                    {
                      name: "login",
                      path: "login",
                      component: () => import("../pages/LoginPage.vue"),
                    },
                  ],
                  component: () => import("@/components/guard/GuestGuard.vue"),
                },
              ],
              component: () => import("@/components/guard/GuardProvider.vue"),
            },
          ],
          component: () => import("./LangGuard.vue"),
          beforeEnter: (to, _) => {
            const lang = to.params.lang as string;
            const storedLocaleRef = useLocalStorage(
              "locale",
              localeService.getLocale(),
            );
            localeService.setLocale(storedLocaleRef.value);
            localeService.setLocale(lang);
            const locale = localeService.getLocale();
            storedLocaleRef.value = locale;

            if (locale === lang) {
              return true;
            }

            return {
              path: localeService.resolvePathname(to.path),
            };
          },
        },
      ],
    },
  ];
};
