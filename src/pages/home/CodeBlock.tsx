import ReactMarkdown from "react-markdown";
import RehypeHighlight from "rehype-highlight";
import RehypeKatex from "rehype-katex";
import RemarkBreaks from "remark-breaks";
import RemarkGfm from "remark-gfm";
import RemarkMath from "remark-math";
import "@/assets/scss/highlight.scss";
import "@/assets/scss/markdown.scss";
import "@/assets/scss/scrollbar.scss";
import markdown from "./markdown.md?raw";

export function CodeBlock() {
  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[
        RehypeKatex,
        [
          RehypeHighlight,
          {
            detect: false,
            ignoreMissing: true,
          },
        ],
      ]}
    >
      {markdown}
    </ReactMarkdown>
  );
}
