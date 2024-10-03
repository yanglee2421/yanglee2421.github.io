import { createHighlighterCore } from "shiki/core";
import getWasm from "shiki/wasm";

export const hightlighter = createHighlighterCore({
  themes: [import("shiki/themes/dark-plus.mjs")],
  langs: [import("shiki/langs/json.mjs")],
  loadWasm: getWasm,
});
