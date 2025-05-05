import axios, { AxiosRequestConfig } from "axios";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const netlify = axios.create({
  baseURL: import.meta.env.VITE_NETLIFY_API_URL,
  timeout: 1000 * 60,
});

type SignInResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

const SIGNIN_FIREBAESE_PATH = "/auth/firebase";

type SignInFirebaseBody = {
  firebaseId: string;
  name: string;
};

type SignInFirebaseConf = AxiosRequestConfig<SignInFirebaseBody>;

export const fetchUserByFirebase = (conf: SignInFirebaseConf) =>
  queryOptions({
    queryKey: [netlify.defaults.baseURL, SIGNIN_FIREBAESE_PATH, "POST", conf],
    queryFn: ({ signal }) =>
      netlify<SignInResponse>({
        signal,
        url: SIGNIN_FIREBAESE_PATH,
        method: "POST",
        ...conf,
      }),
  });

const SIGNIN_GOOGLE_PATH = "/auth/google";

type SignInGoogleBody = {
  googleId: string;
  email: string;
};

type SignInGoogleConf = AxiosRequestConfig<SignInGoogleBody>;

export const fetchUserByGoogle = (conf: SignInGoogleConf) =>
  queryOptions({
    queryKey: [netlify.defaults.baseURL, SIGNIN_GOOGLE_PATH, "POST", conf],
    queryFn: ({ signal }) =>
      netlify<SignInResponse>({
        url: SIGNIN_GOOGLE_PATH,
        method: "POST",
        signal,
        ...conf,
      }),
  });

const SIGNIN_GITHUB_PATH = "/auth/github";

type SignInGithubBody = {
  githubId: string;
  email: string;
};

type SignInGithubConf = AxiosRequestConfig<SignInGithubBody>;

export const fetchUserByGithub = (conf: SignInGithubConf) =>
  queryOptions({
    queryKey: [netlify.defaults.baseURL, SIGNIN_GITHUB_PATH, "POST", conf],
    queryFn: ({ signal }) =>
      netlify<SignInResponse>({
        url: SIGNIN_GITHUB_PATH,
        method: "POST",
        signal,
        ...conf,
      }),
  });

const OVERTIME_PATH = "/overtime";

type OvertimeParams = {
  pageIndex: number;
  pageSize: number;
};

type OvertimeGetConf = AxiosRequestConfig & {
  params: OvertimeParams;
};

export type Overtime = {
  id: string;
  userId: string;
  date: string;
  hours: number;
  reason: string | null;
  createdAt: string;
  updatedAt: string;
  redeemed: boolean;
};

type OvertimeGetResponse = {
  count: number;
  rows: Overtime[];
};

export const fetchOvertime = (conf: OvertimeGetConf) =>
  queryOptions({
    queryKey: [netlify.defaults.baseURL, OVERTIME_PATH, "GET", conf],
    queryFn: ({ signal }) =>
      netlify<OvertimeGetResponse>({
        url: OVERTIME_PATH,
        method: "GET",
        signal,
        ...conf,
      }),
  });

type OvertimeUpdateItem = {
  date?: string;
  hours?: number;
  reason?: string;
  redeemed?: boolean;
};

type OvertimeBody = { rows: OvertimeUpdateItem[] };
type OvertimeConf = AxiosRequestConfig<OvertimeBody>;

export const useOvertime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (conf: OvertimeConf) =>
      netlify({
        url: OVERTIME_PATH,
        method: "POST",
        ...conf,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: fetchOvertime({
          params: {
            pageIndex: 0,
            pageSize: 10,
          },
        }).queryKey.slice(0, 3),
      });
    },
  });
};

type OvertimeDeleteBody = {
  id: string[];
};

type OvertimeDeleteConf = AxiosRequestConfig<OvertimeDeleteBody>;

export const useDeleteOvertime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (conf: OvertimeDeleteConf) =>
      netlify({
        url: OVERTIME_PATH,
        method: "DELETE",
        ...conf,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: fetchOvertime({
          params: {
            pageIndex: 0,
            pageSize: 10,
          },
        }).queryKey.slice(0, 3),
      });
    },
  });
};
