import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

export const hightlighter = createHighlighterCore({
  themes: [
    import("shiki/themes/dark-plus.mjs"),
    import("shiki/themes/light-plus.mjs"),
  ],
  langs: [
    import("shiki/langs/json.mjs"),
    import("shiki/langs/markdown.mjs"),
    import("shiki/langs/css.mjs"),
    import("shiki/langs/js.mjs"),
    import("shiki/langs/jsx.mjs"),
    import("shiki/langs/ts.mjs"),
    import("shiki/langs/tsx.mjs"),
  ],
  engine: createOnigurumaEngine(() => import("shiki/wasm")),
});
