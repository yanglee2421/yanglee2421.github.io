import { Markdown } from "@/components/markdown";
import handbook from "@/data/handbook.md?raw";

export const Component = () => {
  return <Markdown code={handbook} />;
};
