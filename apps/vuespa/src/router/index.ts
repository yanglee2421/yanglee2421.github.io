import { useAuth } from "@/hooks/use-auth";
import { localeService } from "@/shared/locale";
import { Observable } from "rxjs";
import { createRouter, createWebHashHistory } from "vue-router";
import { handleHotUpdate, routes } from "vue-router/auto-routes";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router;

const i18nGuard$ = new Observable((sub) => {
  const dispose = router.beforeEach((to, from) => {
    const path = localeService.resolvePathname(to.path);
    sub.next({ to, from, path });

    if (Object.is(path, to.path)) {
      return true;
    }

    return { path };
  });

  return () => {
    dispose();
  };
});

const authGuard$ = new Observable((sub) => {
  const dispose = router.beforeEach((to, from) => {
    sub.next({ to, from });
    const requireAuth = to.meta.requireAuth;
    const requireGuest = to.meta.requireGuest;
    const store = useAuth();

    if (requireAuth) {
      return store.isLoggIn
        ? true
        : {
            path: "/login",
            query: {
              redirect_to: to.fullPath,
            },
          };
    }
    if (requireGuest) {
      const redirect_to = to.query.redirect_to;
      return store.isLoggIn
        ? { path: typeof redirect_to === "string" ? redirect_to : "/home" }
        : true;
    }

    return true;
  });

  return () => {
    dispose();
  };
});

i18nGuard$.subscribe();
authGuard$.subscribe();
