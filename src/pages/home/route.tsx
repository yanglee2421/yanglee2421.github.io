import { hightlighter } from "@/lib/hightlighter";
import readme from "@/data/markdown.md?raw";
import React from "react";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";
import { useIsDark } from "@/hooks/dom/useIsDark";
import { styled } from "@mui/material";

const toIsDark = (mode: "dark" | "light" | "system", inDark: boolean) => {
  switch (mode) {
    case "dark":
      return true;
    case "light":
      return false;
    case "system":
    default:
      return inDark;
  }
};

const PreWrapper = styled("div")({
  "& code": {
    fontFamily: "Consolas, 'Courier New', monospace",
    fontSize: 20,
  },
});

export function Component() {
  const hl = React.use(hightlighter);
  const mode = useLocaleStore((s) => s.mode);
  const isDark = useIsDark();

  return (
    <PreWrapper
      dangerouslySetInnerHTML={{
        __html: hl.codeToHtml(readme, {
          lang: "markdown",
          theme: toIsDark(mode, isDark) ? "dark-plus" : "light-plus",
        }),
      }}
    />
  );
}
