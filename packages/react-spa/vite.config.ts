import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ReactCompilerConfig = {
  // '17' | '18' | '19'
  target: "19",
};
const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
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

      rollupOptions: {
        input: {
          index: resolve(__dirname, "./index.html"),
        },
        external: [],
        output: {
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },

      target: "baseline-widely-available",
      minify: "esbuild",

      // cssTarget: "baseline-widely-available",
      cssMinify: "esbuild",
      cssCodeSplit: true,
      // lib: { cssFileName: "style.css" },

      manifest: true,
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
