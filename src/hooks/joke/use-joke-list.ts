// API Imports
import { useQuery } from "@tanstack/react-query";
// import {} from ''

export function useJokeList() {
  return useQuery({
    queryKey: [],
    queryFn() {
      return {};
    },
  });
}
