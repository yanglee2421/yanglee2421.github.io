import babel from "@rolldown/plugin-babel";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    matches: ["*://*/*"],
    permissions: ["storage", "tabs"],
    name: "Simple Newtab",
    content_security_policy: {
      extension_pages:
        "script-src 'self' http://localhost:8097/; object-src 'self'",
    },
  },
  react: {
    vitePluginsBefore: [
      babel({ presets: [reactCompilerPreset({ target: "19" })] }),
    ],
  },
  srcDir: "src",
});
