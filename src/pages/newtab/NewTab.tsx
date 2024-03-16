import { QuestionAnswerOutlined } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";
import React from "react";
import { useThemeStore } from "@/hooks/store/useThemeStore";
import { Customer } from "./Customer";
import { FixedImageBackground } from "./FixedImageBackground";

export function NewTab() {
  const bgAlpha = useThemeStore((store) => store.bgAlpha);
  const bgBlur = useThemeStore((store) => store.bgBlur);
  const deferredAlpha = React.useDeferredValue(bgAlpha);
  const deferredBlur = React.useDeferredValue(bgBlur);

  return (
    <>
      <FixedImageBackground alpha={deferredAlpha} blur={deferredBlur} />
      <Stack
        position={"fixed"}
        zIndex={3}
        top={"1.25rem"}
        right={"1.25rem"}
        direction={"row"}
        spacing={3}
      >
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <Customer />
      </Stack>
    </>
  );
}
