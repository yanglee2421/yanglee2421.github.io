import { queryOptions } from "@tanstack/react-query";
import { overtimeCollection } from "@/api/firebase/app";
import { getDocs, query, startAfter, limit } from "firebase/firestore";

export const queryOvertime = queryOptions({
  queryKey: ["firebase", "overtime"],
  async queryFn() {
    const docs = await getDocs(
      query(overtimeCollection, startAfter(1), limit(1)),
    );
    return docs.docs;
  },
});
