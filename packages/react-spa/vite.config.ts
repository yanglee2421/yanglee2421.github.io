import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
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
    envDir: resolve(__dirname, "./"),
    assetsInclude: [],
    build: {
      outDir: resolve(__dirname, "./dist"),
      emptyOutDir: true,

      rolldownOptions: {
        input: {
          index: resolve(__dirname, "./index.html"),
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
        allow: [resolve(__dirname, "../../")],
      },
    },
  };
});
