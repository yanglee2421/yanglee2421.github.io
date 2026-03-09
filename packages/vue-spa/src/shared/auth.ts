import { queryOptions, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useLocalStorage } from "@vueuse/core";
import { computed, toValue, type Ref } from "vue";
import { queryClient } from "./query";

export const pageRoleSymbol = Symbol("pageRole");

export const fetchAuthStatus = (enabled: Ref<boolean>) => {
  return queryOptions({
    queryKey: ["authStatus"],
    queryFn: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      return true;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
  });
};

export const useAuthQuery = () => {
  const refreshTokenRef = useRefreshToken();
  return useQuery(fetchAuthStatus(computed(() => !!toValue(refreshTokenRef))));
};

export const useUser = () => {
  const { status, data } = useAuthQuery();
  const refreshToken = useRefreshToken();

  const user = computed(() => {
    const dataValue = toValue(data);
    const statusValue = toValue(status);
    const refreshTokenValue = toValue(refreshToken);

    if (!refreshTokenValue) return null;

    switch (statusValue) {
      case "pending":
      case "error":
        return null;
      case "success":
        return dataValue ?? null;
    }
  });

  return user;
};

export const ensureAuth = () => {
  const refreshTokenRef = useRefreshToken();
  return queryClient.ensureQueryData(
    fetchAuthStatus(computed(() => !!toValue(refreshTokenRef))),
  );
};

export const useRefreshToken = () => {
  return useLocalStorage("REFRESH_TOKEN", "");
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const refreshToken = useRefreshToken();

  return async () => {
    queryClient.setQueryData(["authStatus"], true);

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
