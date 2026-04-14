import {
  keepPreviousData,
  queryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { useLocalStorage } from "@vueuse/core";
import * as Vue from "vue";
import { queryClient } from "./query";

interface User {
  id: number;
}

export const fetchAuthStatus = (enabled: Vue.Ref<boolean>) => {
  return queryOptions({
    queryKey: ["authStatus"],
    queryFn: async (): Promise<User> => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      return { id: 1 };
    },
    placeholderData: keepPreviousData,
    enabled,
    // staleTime: Infinity,
    // gcTime: Infinity,
  });
};

export const useAuthQuery = () => {
  const refreshTokenRef = useRefreshToken();
  const enabled = Vue.computed(() => !!Vue.toValue(refreshTokenRef));

  return useQuery(fetchAuthStatus(enabled));
};

const USER_SYMBOL = Symbol("user");

export const useProvideUser = (user: Vue.Ref<User | undefined>) => {
  Vue.provide(USER_SYMBOL, user);
};

export const useUser = () => {
  const user = Vue.inject<Vue.Ref<User | undefined>>(USER_SYMBOL);
  const refreshTokenRef = useRefreshToken();

  if (typeof user === "undefined") {
    throw new Error("useUser must be used within a provider");
  }

  return Vue.computed(() => {
    const rt = Vue.toValue(refreshTokenRef);
    const u = Vue.toValue(user);

    if (!rt) {
      return null;
    }

    return u || null;
  });
};

export const ensureAuth = () => {
  const refreshTokenRef = useRefreshToken();
  return queryClient.ensureQueryData(
    fetchAuthStatus(Vue.computed(() => !!Vue.toValue(refreshTokenRef))),
  );
};

export const useRefreshToken = () => {
  return useLocalStorage("REFRESH_TOKEN", "");
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const refreshToken = useRefreshToken();

  return async () => {
    queryClient.setQueryData(["authStatus"], { id: 1 });

    refreshToken.value = "xxxx";
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const refreshToken = useRefreshToken();

  return async () => {
    queryClient.clear();

    refreshToken.value = "";
  };
};
