// Toast Imports
import { Button, Stack } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

// MUI Imports

// React Imports

export function Toast() {
  const loadingRef = React.useRef<string | number>(Math.random());

  return (
    <Stack spacing={3} direction={"row"} flexWrap={"wrap"}>
      <Button
        onClick={() => {
          toast.success("success");
        }}
        variant="outlined"
        color="success"
      >
        success
      </Button>
      <Button
        onClick={() => {
          toast.error("error");
        }}
        variant="outlined"
        color="error"
      >
        error
      </Button>
      <Button
        onClick={() => {
          toast.warning("warning");
        }}
        variant="outlined"
        color="warning"
      >
        warning
      </Button>
      <Button
        onClick={() => {
          toast.warn("warn");
        }}
        variant="outlined"
        color="warning"
      >
        warn
      </Button>
      <Button
        onClick={() => {
          toast.info("info");
        }}
        variant="outlined"
        color="info"
      >
        info
      </Button>
      <Button
        onClick={() => {
          if (toast.isActive(loadingRef.current)) {
            toast.done(loadingRef.current);
            return;
          }

          loadingRef.current = toast.loading("loading");
        }}
      >
        loading/done
      </Button>
      <Button
        onClick={() => {
          if (toast.isActive(loadingRef.current)) {
            toast.pause({
              id: loadingRef.current,
            });
            return;
          }

          toast.play({
            id: loadingRef.current,
          });
        }}
      >
        play/pause
      </Button>
      <Button
        onClick={() => {
          toast.promise(
            new Promise<void>((resolve) => {
              setTimeout(resolve, 1000);
            }),
            {
              pending: "pending",
              error: "error",
              success: "success",
            },
          );
        }}
      >
        promise
      </Button>
      <Button
        onClick={() => {
          toast.dismiss();
        }}
      >
        dismiss
      </Button>
    </Stack>
  );
}
