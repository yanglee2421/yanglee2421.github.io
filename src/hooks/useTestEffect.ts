import React from "react";
import { log } from "@/lib/utils";

export const useTestEffect = (name = "") => {
  React.useEffect(() => {
    log("useTestEffect", name);

    return () => {
      log("useTestEffect cleanup", name);
    };
  });

  React.useInsertionEffect(() => {
    log("useTestEffect insertion", name);

    return () => {
      log("useTestEffect insertion cleanup", name);
    };
  });

  React.useLayoutEffect(() => {
    log("useTestEffect layout", name);

    return () => {
      log("useTestEffect layout cleanup", name);
    };
  });
};
