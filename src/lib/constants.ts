import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

export const GITHUB_URL =
  "https://github.com/yanglee2421/yanglee2421.github.io";
export const FALLBACK_LANG = "en";
export const DEFAULT_MODE = "system";
export const LANGS = new Set(["en", "zh"]);
export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const HEADER_SIZE_XS = 7;
export const HEADER_SIZE_SM = 8;
export const ASIDE_SIZE = 40;
export const FULL_YEAR = new Date().getFullYear();

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
    import("shiki/langs/html.mjs"),
    import("shiki/langs/bash.mjs"),
    import("shiki/langs/vue.mjs"),
  ],
  engine: createOnigurumaEngine(() => import("shiki/wasm")),
});
