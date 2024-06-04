import Prism from "prismjs";
import "prismjs/components/prism-json.js";
import "prismjs/themes/prism.css";

export function JsonBlock(props: Props) {
  return (
    <pre className="language-json">
      <code
        className="language-json"
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            JSON.stringify(props.jsonData, null, 2),
            Prism.languages.json,
            "json",
          ),
        }}
      ></code>
    </pre>
  );
}

type Props = {
  jsonData: NonNullable<unknown>;
};
