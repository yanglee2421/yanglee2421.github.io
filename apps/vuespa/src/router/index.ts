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

const beforeEach$ = new Observable((sub) => {
  const dispose = router.beforeEach((to, from) => {
    const path = localeService.resolvePathname(to.path);

    if (Object.is(path, to.path)) {
      return true;
    }

    sub.next({ to, from, path });

    return { path };
  });

  return () => {
    dispose();
  };
});

beforeEach$.subscribe((info) => {
  console.log(info);
});
