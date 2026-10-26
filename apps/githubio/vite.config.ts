import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps"),
);
const standardFontsDir = normalizePath(
  path.join(
    path.dirname(require.resolve("pdfjs-dist/package.json")),
    "standard_fonts",
  ),
);
const wasmDir = normalizePath(
  path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "wasm"),
);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      babel({
        presets: [
          reactCompilerPreset({
            // '17' | '18' | '19'
            target: "19",
          }),
        ],
      }),
      viteStaticCopy({
        targets: [
          {
            src: cMapsDir,
            dest: "cmaps",
            rename: { stripBase: true },
          },
          {
            src: standardFontsDir,
            dest: "standard_fonts",
            rename: { stripBase: true },
          },
          {
            src: wasmDir,
            dest: "wasm",
            rename: { stripBase: true },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      preserveSymlinks: false,
    },
    css: {
      preprocessorOptions: {},
      modules: {
        // localsConvention: "camelCaseOnly",
      },
    },
    // experimental: { enableNativePlugin: true },
    base: "./",
    envDir: path.resolve(__dirname, "./"),
    assetsInclude: [],
    build: {
      outDir: path.resolve(__dirname, "./dist"),
      emptyOutDir: true,

      rolldownOptions: {
        input: {
          index: path.resolve(__dirname, "./index.html"),
        },
        external: [],
        output: {
          entryFileNames: "[name]-[hash].js",
          chunkFileNames: "[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },

      target: "baseline-widely-available",
      minify: "oxc",

      // cssTarget: "baseline-widely-available",
      cssMinify: "lightningcss",
      cssCodeSplit: true,
      // lib: { cssFileName: "style.css" },

      manifest: false,
      sourcemap: false,
      chunkSizeWarningLimit: 500,
      assetsInlineLimit: 4096,
    },

    server: {
      port: 3006,
      strictPort: true,
      hmr: {
        port: 3006,
      },
      host: false,
      proxy: {
        "/dev": {
          target: "http://localhost:3002",
          rewrite(path) {
            return path.replace(/^\/dev/, "");
          },
          changeOrigin: true,
          ws: true,
        },
      },
      fs: {
        allow: [path.resolve(__dirname, "../../")],
      },
    },
  };
});
