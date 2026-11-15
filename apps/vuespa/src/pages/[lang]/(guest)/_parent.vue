<script lang="ts" setup>
import { useAuth } from "@/hooks/use-auth";
import { filter, Observable, tap } from "rxjs";
import { watchPostEffect } from "vue";
import { RouterView, useRouter } from "vue-router";

interface AuthState {
  isLoggIn: boolean;
}
definePage({ meta: { requireGuest: true } });

const router = useRouter();
const auth = useAuth();

watchPostEffect((cleanup) => {
  const $ = new Observable<AuthState>((sub) => {
    const unsubscribe = auth.$subscribe((_, state) => {
      sub.next(state);
    });

    return () => {
      unsubscribe();
    };
  }).pipe(
    filter((state) => state.isLoggIn),
    tap(() => {
      router.replace({ path: "/home" });
    }),
  );

  const subscription = $.subscribe();

  cleanup(() => {
    subscription.unsubscribe();
  });
});
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
