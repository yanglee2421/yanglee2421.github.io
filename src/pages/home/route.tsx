import readme from "@/data/markdown.md?raw";
import { Markdown } from "@/components/markdown";

export function Component() {
  return <Markdown code={readme} />;
}
