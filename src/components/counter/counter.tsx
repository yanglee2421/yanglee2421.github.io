// React Imports
import React from "react";

// Store Imports
import { myStore } from "./my-store";

// MUI Imports
import { Button } from "@mui/material";

export function Counter() {
  const store = React.useSyncExternalStore(
    myStore.subscribe.bind(myStore),
    myStore.getSnapshot.bind(myStore)
  );

  const clickHandler = () => {
    myStore.dispatch();
  };

  return (
    <Button onClick={clickHandler} variant="outlined">
      {store.count}
    </Button>
  );
}
