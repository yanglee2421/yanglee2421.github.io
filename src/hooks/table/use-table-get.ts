// API Imports
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { table_get } from "@/api/mock";
import { Req, Res } from "@/api/mock/table_get";

export function useTableGet(req: Req) {
  return useQuery<Res, Error>({
    queryKey: ["table_get", req.params],
    queryFn({ signal }) {
      console.log("fetching");
      return table_get({ signal, ...req });
    },
    placeholderData: keepPreviousData,
  });
}
