import { QueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 2,

      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,

      retry: 1,
      retryDelay(attemptIndex) {
        return Math.min(1000 * 2 ** attemptIndex, 1000 * 8);
      },

      experimental_prefetchInRender: true,
    },
  },
});

const resolveBearerToken = (token: string) => {
  return `Bearer ${token}`;
};

class RetryCounter {
  private count = 0;
  private maxRetries: number;

  constructor(maxRetries: number) {
    this.maxRetries = maxRetries;
  }

  increment() {
    this.count += 1;
  }
  reset() {
    this.count = 0;
  }
  canRetry() {
    return this.count < this.maxRetries;
  }
}

export const createAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    config.headers.setAuthorization(``, false);

    return config;
  });

  const retryCounter = new RetryCounter(1);

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!axios.isAxiosError(error)) {
        return Promise.reject(error);
      }

      const statusCode = error.status;
      const errorMessage = error.response?.data?.message;
      const originalToken = error.config?.headers.getAuthorization();
      const accessToken = resolveBearerToken(
        localStorage.getItem("accessToken") ?? "",
      );
      const refreshToken = resolveBearerToken(
        localStorage.getItem("refreshToken") ?? "",
      );

      if (statusCode !== 401) {
        return Promise.reject(error);
      }

      if (errorMessage !== "ACCESS_TOKEN_EXPIRED") {
        return Promise.reject(error);
      }

      if (Object.is(originalToken, resolveBearerToken(refreshToken))) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        return Promise.reject(error);
      }

      if (!Object.is(originalToken, resolveBearerToken(accessToken))) {
        return Promise.reject(error);
      }

      if (!retryCounter.canRetry()) {
        return Promise.reject(error);
      }

      retryCounter.increment();

      const {
        data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
      } = await instance.request({
        url: "/auth/refresh",
        method: "POST",
        headers: {
          Authorization: refreshToken,
        },
      });

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      return instance
        .request({
          ...error.config,
          headers: {
            ...error.config?.headers,
            Authorization: resolveBearerToken(newAccessToken),
          },
        })
        .then((response) => {
          retryCounter.reset();

          return response;
        });
    },
  );

  return instance;
};
