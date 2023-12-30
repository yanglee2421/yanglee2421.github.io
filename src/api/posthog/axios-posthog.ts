// Axios Imports
import axios, { AxiosError } from "axios";

export const axiosPosthog = axios.create({
  baseURL: import.meta.env.VITE_POSTHOG_URL,
  timeout: 1000 * 30,
});

axiosPosthog.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_POSTHOG_APIKEY;
  config.headers.setAuthorization(`Bearer ${token}`, false);

  return config;
});
axiosPosthog.interceptors.response.use(
  (res) => {
    const { data } = res;

    return data;
  },
  (error: AxiosError) => {
    const { message } = error;
    throw new Error(message);
  }
);
