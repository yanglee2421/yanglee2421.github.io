import Prism from "prismjs";
import "prismjs/components/prism-json.js";
import "prismjs/themes/prism.css";
import { ScrollView } from "@/components/ui/ScrollView";
import jsonData from "@/data/jsonblock.json";

export function JsonBlock() {
  return (
    <ScrollView height={420}>
      <pre className="language-json">
        <code
          className="language-json"
          dangerouslySetInnerHTML={{ __html: jsonHtml }}
        ></code>
      </pre>
    </ScrollView>
  );
}

const jsonHtml = Prism.highlight(
  JSON.stringify(jsonData, null, 2),
  Prism.languages.json,
  "json",
);
