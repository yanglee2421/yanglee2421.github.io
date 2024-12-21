import React from "react";

export const useTestEffect = () => {
  React.useEffect(() => {
    console.log("useTestEffect");

    return () => {
      console.log("useTestEffect cleanup");
    };
  });

  React.useInsertionEffect(() => {
    console.log("useTestEffect insertion");

    return () => {
      console.log("useTestEffect insertion cleanup");
    };
  });

  React.useLayoutEffect(() => {
    console.log("useTestEffect layout");

    return () => {
      console.log("useTestEffect layout cleanup");
    };
  });
};
