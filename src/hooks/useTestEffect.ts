import React from "react";

export const useTestEffect = (name = "") => {
  React.useEffect(() => {
    console.log("useTestEffect", name);

    return () => {
      console.log("useTestEffect cleanup", name);
    };
  });

  React.useInsertionEffect(() => {
    console.log("useTestEffect insertion", name);

    return () => {
      console.log("useTestEffect insertion cleanup", name);
    };
  });

  React.useLayoutEffect(() => {
    console.log("useTestEffect layout", name);

    return () => {
      console.log("useTestEffect layout cleanup", name);
    };
  });
};
