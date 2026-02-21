import path from "node:path";
import url from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
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

    // rollupOptions: {
    //   input: {
    //     index: path.resolve(__dirname, "./index.html"),
    //   },
    //   external: [],
    //   output: {
    //     entryFileNames: "assets/[name]-[hash].js",
    //     chunkFileNames: "assets/[name]-[hash].js",
    //     assetFileNames: "assets/[name]-[hash][extname]",
    //   },
    // },

    target: "baseline-widely-available",
    // minify: "esbuild",

    // cssTarget: "baseline-widely-available",
    // cssMinify: "esbuild",
    cssCodeSplit: true,
    // lib: { cssFileName: "style.css" },

    manifest: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096,
  },

  server: {
    port: 3007,
    strictPort: true,
    hmr: {
      port: 3007,
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
});
