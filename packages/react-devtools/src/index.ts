import type { Plugin } from "vite";

export const reactDevtoolsPlugin = (): Plugin => {
  return {
    name: "vite-plugin-react-devtools-injector",
    transformIndexHtml: () => [
      {
        tag: "script",
        attrs: { src: "http://localhost:8097" },
        injectTo: "head-prepend",
      },
    ],
    apply: "serve",
  };
};
