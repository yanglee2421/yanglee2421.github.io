import React from "react";
import { MarkdownHooks } from "react-markdown";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeShikiFromHighlighter, {
  type RehypeShikiCoreOptions,
} from "@shikijs/rehype/core";
import { hightlighter } from "@/lib/constants";
import { useIsDark } from "@/hooks/dom/useIsDark";
import { useLocalStore } from "@/hooks/store/useLocalStore";
import { modeToIsDark } from "@/lib/utils";

type MarkdownProps = {
  code: string;
};

export const Markdown = (props: MarkdownProps) => {
  const hightlighterCore = React.use(hightlighter);

  const isDarkMode = useIsDark();
  const mode = useLocalStore((s) => s.mode);

  const isDark = modeToIsDark(mode, isDarkMode);
  const options: RehypeShikiCoreOptions = {
    theme: isDark ? "dark-plus" : "light-plus",
  };

  return (
    <MarkdownHooks
      rehypePlugins={[
        rehypeRaw,
        [rehypeShikiFromHighlighter, hightlighterCore, options],
      ]}
      remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
      fallback={<div>Loading...</div>}
    >
      {props.code}
    </MarkdownHooks>
  );
};
