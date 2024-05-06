import Prism from "prismjs";
import "prismjs/components/prism-json.js";
import "prismjs/themes/prism.css";
import React from "react";

export function JsonBlock(props: Props) {
  const { children, jsonData, className, ...restProps } = props;
  void children;

  return (
    <pre className={"language-json " + className} {...restProps}>
      <code
        className="language-json"
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            JSON.stringify(jsonData, null, 2),
            Prism.languages.json,
            "json",
          ),
        }}
      ></code>
    </pre>
  );
}

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  jsonData: unknown;
};
