import { QuestionAnswerOutlined } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";
import React from "react";
import { useThemeStore } from "@/hooks/store/useThemeStore";
// import { Customer } from "./Customer";
import { useQuery } from "@tanstack/react-query";
// import { FixedImageBackground } from "./FixedImageBackground";

export function NewTab() {
  const bgAlpha = useThemeStore((store) => store.bgAlpha);
  const bgBlur = useThemeStore((store) => store.bgBlur);
  const deferredAlpha = React.useDeferredValue(bgAlpha);
  const deferredBlur = React.useDeferredValue(bgBlur);

  const fileRef = React.useRef<any>(null);
  const [count, setCount] = React.useState(0);

  useQuery({
    queryKey: ["xx"],
    queryFn() {
      return Promise.resolve({ msg: "xx" });
    },
    staleTime: 0,
  });

  return (
    <>
      <IconButton onClick={() => setCount((prev) => prev + 1)}>
        <QuestionAnswerOutlined />
      </IconButton>
      {count}
      {/* <FixedImageBackground alpha={deferredAlpha} blur={deferredBlur} /> */}
      {/* <Stack
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
      </Stack> */}
    </>
  );
}
