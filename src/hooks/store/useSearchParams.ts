// Zustand Imports
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

// React Imports
import React from "react";

export const useRouterStore = create<SearchParamsStore>((set, get) => {
  return {
    search: window.location.search,
    setSearch(action) {
      // Get next search
      const search = (() => {
        if (typeof action === "function") {
          return action(get().search);
        }

        return action;
      })();

      // Set next search
      return set({ search });
    },
  };
});

export const useSearchParams = () => {
  const { search, setSearch } = useRouterStore(
    useShallow((store) => {
      return {
        search: store.search,
        setSearch: store.setSearch,
      };
    })
  );

  const searchParams = React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  const setSearchParams = React.useCallback<
    React.Dispatch<React.SetStateAction<URLSearchParams>>
  >(
    (action) => {
      return setSearch((prevSearch) => {
        if (typeof action === "function") {
          return action(new URLSearchParams(prevSearch)).toString();
        }

        return action.toString();
      });
    },
    [setSearch]
  );

  React.useEffect(() => {
    const animateId = setTimeout(() => {
      const url = new URL(window.location.href);
      url.search = search;
      history.replaceState(null, "", url);
    }, 16);

    return () => {
      clearTimeout(animateId);
    };
  }, [search]);

  return [searchParams, setSearchParams] as [
    typeof searchParams,
    typeof setSearchParams
  ];
};

export interface SearchParamsStore {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
