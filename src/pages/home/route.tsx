import readme from "@/assets/markdown.md?raw";
import { Markdown } from "@/components/markdown";

export function Component() {
  return <Markdown code={readme} />;
}
