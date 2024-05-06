import Prism from "prismjs";
import "prismjs/components/prism-json.js";
import "prismjs/themes/prism.css";
import jsonData from "@/data/jsonblock.json";

export function JsonBlock() {
  return (
    <pre className="language-json">
      <code
        className="language-json"
        dangerouslySetInnerHTML={{ __html: jsonHtml }}
      ></code>
    </pre>
  );
}

const jsonHtml = Prism.highlight(
  JSON.stringify(jsonData, null, 2),
  Prism.languages.json,
  "json",
);
