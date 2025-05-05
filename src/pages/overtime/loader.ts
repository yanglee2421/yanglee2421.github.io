import { QueryProvider } from "@/components/query";
import { fetchOvertime } from "@/api/netlify";
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

  const netlifyToken = state.state.netlifyToken;
  const headers = new AxiosHeaders();
  headers.setAuthorization(`Bearer ${netlifyToken}`, false);

  await QueryProvider.queryClient.ensureQueryData(
    fetchOvertime({
      params: {
        pageIndex: 0,
        pageSize: 20,
      },
      headers: headers,
    }),
  );
};
