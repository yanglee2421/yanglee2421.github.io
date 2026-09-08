import { LinearProgress } from "@mui/material";
import React from "react";
import { useNavigation } from "react-router";

export const Component = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LinearProgress />;
  }

  return (
    <React.Fragment>
      <></>
    </React.Fragment>
  );
};
