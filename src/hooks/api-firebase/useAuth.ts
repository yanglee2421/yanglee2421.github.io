import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { app } from "@/api/firebase/app";

export function useAuth() {
  return useQuery({
    queryKey: ["firebase/authStateReady"],
    async queryFn() {
      await authReady;

      return getAuth(app);
    },

    gcTime: Infinity,
  });
}

const authReady = getAuth(app).authStateReady();
