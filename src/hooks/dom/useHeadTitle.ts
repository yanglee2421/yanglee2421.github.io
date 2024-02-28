import React from "react";

export function useHeadTitle(title: string) {
  React.useEffect(() => {
    const prevTitle = document.title;

    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
