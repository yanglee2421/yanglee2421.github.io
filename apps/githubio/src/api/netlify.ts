import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export const netlify = axios.create({
  baseURL: import.meta.env.VITE_NETLIFY_API_URL,
  timeout: 1000 * 60,
});

interface SignInResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

const SIGNIN_FIREBAESE_PATH = "/auth/firebase";

interface SignInFirebaseBody {
  firebaseId: string;
  name: string;
}

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

interface SignInGoogleBody {
  googleId: string;
  email: string;
}

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

interface SignInGithubBody {
  githubId: string;
  email: string;
}

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

export const OVERTIME_PATH = "/overtime";

interface OvertimeParams {
  pageIndex: number;
  pageSize: number;
}

type OvertimeGetConf = AxiosRequestConfig & {
  params: OvertimeParams;
};

export interface Overtime {
  _id: string;
  userId: string;
  date: string;
  hours: number;
  reason: string | null;
  createdAt: string;
  updatedAt: string;
  redeemed: boolean;
}

interface OvertimeGetResponse {
  count: number;
  rows: Overtime[];
}

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

interface OvertimeUpdateItem {
  date?: string;
  hours?: number;
  reason?: string;
  redeemed?: boolean;
}

interface OvertimeBody {
  rows: OvertimeUpdateItem[];
}
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

interface OvertimeDeleteBody {
  id: string[];
}

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
