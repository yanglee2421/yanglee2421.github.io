import { styled } from "@mui/material";
import ReactMarkdown from "react-markdown";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RemarkGfm from "remark-gfm";
import { hightlighter } from "@/lib/hightlighter";
import { useLocaleStore } from "@/hooks/store/useLocaleStore";
import { useIsDark } from "@/hooks/dom/useIsDark";
import React from "react";
import { modeToIsDark } from "@/lib/utils";

const CodeWrapper = styled("div")({
  "pre.shiki": {
    whiteSpace: "pre-wrap",
  },
  "& code": {
    fontFamily: "Consolas, 'Courier New', monospace",
    fontSize: 20,
  },
});

type CodeProps = {
  code: string;
  lang: string;
};

const Code = (props: CodeProps) => {
  const highlight = React.use(hightlighter);

  const mode = useLocaleStore((s) => s.mode);
  const isDark = useIsDark();
  const dark = modeToIsDark(mode, isDark);

  return (
    <CodeWrapper
      data-lang={props.lang}
      dangerouslySetInnerHTML={{
        __html: highlight.codeToHtml(props.code, {
          theme: dark ? "dark-plus" : "light-plus",
          lang: highlight.getLoadedLanguages().includes(props.lang)
            ? props.lang
            : "text",
        }),
      }}
    />
  );
};

type MarkdownProps = {
  code: string;
};

export const Markdown = (props: MarkdownProps) => (
  <ReactMarkdown
    remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
    components={{
      code(props) {
        const { children, className, ...rest } = props;
        const match = /language-(\w+)/.exec(className || "");

        return match ? (
          <Code code={String(children)} lang={match[1]} />
        ) : (
          <code {...rest} className={className}>
            {children}
          </code>
        );
      },
      pre: React.Fragment,
    }}
  >
    {props.code}
  </ReactMarkdown>
);
