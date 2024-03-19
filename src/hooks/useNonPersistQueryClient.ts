import React from "react";
import { nonPersistQueryContext } from "@/libs/nonPersistQueryClient";

export function useNonPersistQueryClient() {
  return React.useContext(nonPersistQueryContext);
}
