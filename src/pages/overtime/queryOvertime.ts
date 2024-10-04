import { queryOptions } from "@tanstack/react-query";
import { overtimeCollection } from "@/api/firebase/app";
import { getDocs, query } from "firebase/firestore";

export const getOptions = () =>
  queryOptions({
    queryKey: ["firebase", "overtime"],
    async queryFn() {
      const docs = await getDocs(query(overtimeCollection));
      console.log(docs);

      return docs.docs;
    },
  });
