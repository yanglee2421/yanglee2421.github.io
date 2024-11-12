import { queryOptions } from "@tanstack/react-query";
import { overtimeCollection } from "@/api/firebase/app";
import { getDocs, limit, query, where } from "firebase/firestore";

export const getOptions = ({ userId }: { userId: string }) =>
  queryOptions({
    queryKey: ["firebase", "overtime"],
    async queryFn() {
      const docs = await getDocs(
        query(overtimeCollection, where("userId", "==", userId), limit(20)),
      );

      return docs;
    },
  });
