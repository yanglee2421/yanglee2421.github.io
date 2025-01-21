import { Markdown } from "@/components/markdown";
import handbook from "@/assets/handbook.md?raw";

export const Component = () => {
  return <Markdown code={handbook} />;
};
