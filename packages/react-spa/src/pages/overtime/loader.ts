import { QueryProvider } from "@/components/query";
import { fetchOvertime, netlify, OVERTIME_PATH } from "@/api/netlify";
import { AxiosHeaders } from "axios";
import type { State } from "@/hooks/store/useLocalStore";

const jsonSafeParse = <T>(json: string | null) => {
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

type JSONState = {
  state: State;
};

export const loader = async () => {
  const json = localStorage.getItem("useLocalStore");
  const state = jsonSafeParse<JSONState>(json);

  if (!state) return;

  const conf = {
    params: {
      pageIndex: 0,
      pageSize: 20,
    },
  };

  const fetcher = fetchOvertime(conf);
  const headers = new AxiosHeaders();
  const netlifyToken = state.state.netlifyToken;
  headers.setAuthorization(`Bearer ${netlifyToken}`, false);

  await QueryProvider.queryClient.ensureQueryData({
    ...fetcher,
    /**
     * If this Loader is called before the subscription to netlifyToken is completed,
     * you need to manually inject netlifyToken into queryFn.
     * Additionally, it cannot be passed through queryKey to avoid cache mismatches.
     */
    queryFn: ({ signal }) =>
      netlify({
        url: OVERTIME_PATH,
        method: "GET",
        signal,
        ...conf,
        headers,
      }),
  });
};
