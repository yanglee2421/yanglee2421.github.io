<script lang="ts" setup>
import { useAuth } from "@/hooks/use-auth";
import { filter, Observable, tap } from "rxjs";
import { shallowRef, watchPostEffect } from "vue";
import { useRouter } from "vue-router";

interface AuthState {
  isLoggIn: boolean;
}

const auth = useAuth();
const router = useRouter();
const loginSnapshot = shallowRef(auth.isLoggIn);

watchPostEffect((cleanup) => {
  const $ = new Observable<AuthState>((sub) => {
    const unsubscribe = auth.$subscribe((_, state) => {
      sub.next(state);
    });

    return () => {
      unsubscribe();
    };
  }).pipe(
    filter((state) => !state.isLoggIn),
    tap(() => {
      router.push({ path: "/login" });
    }),
  );

  const subscription = $.subscribe();

  cleanup(() => {
    subscription.unsubscribe();
  });
});
</script>

<template>
  <slot v-if="loginSnapshot"></slot>
  <slot v-else name="fallback"></slot>
</template>

<style scoped></style>
