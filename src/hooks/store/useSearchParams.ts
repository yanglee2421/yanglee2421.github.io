// Zustand Imports
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

// React Imports
import React from "react";

const useSearchStore = create<{
  search: string;
  setSearch(search: string): void;
}>((set) => {
  return {
    search: globalThis.location.search,
    setSearch(search) {
      return set({ search });
    },
  };
});

export const useSearchParams = () => {
  const { search, setSearch } = useSearchStore(
    useShallow((store) => {
      return {
        search: store.search,
        setSearch: store.setSearch,
      };
    })
  );

  const searchParams = React.useMemo(() => {
    return new URLSearchParams(globalThis.location.search);
  }, [search]);

  const setSearchParams = React.useCallback(() => {}, [setSearch]);
};
