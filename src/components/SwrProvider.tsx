import React from "react";
import { SWRConfig } from "swr";

export function SwrProvider(props: React.PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        revalidateOnMount: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      {props.children}
    </SWRConfig>
  );
}
