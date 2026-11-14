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
    const requireAuth = to.meta.requireAuth;
    const store = useAuth();
    sub.next({ to, from });

    if (requireAuth) {
      return store.isLoggIn ? true : { path: "/login" };
    }

    return true;
  });

  return () => {
    dispose();
  };
});

i18nGuard$.subscribe((info) => {
  console.log(info);
});

authGuard$.subscribe();
