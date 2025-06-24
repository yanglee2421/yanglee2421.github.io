import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ReactCompilerConfig = {
  target: "19", // '17' | '18' | '19'
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
        localsConvention: "camelCaseOnly",
      },
    },
    experimental: { enableNativePlugin: true },
    base: "./",
    envDir: resolve(__dirname, "./"),
    assetsInclude: [],

    build: {
      outDir: resolve(__dirname, "./docs"),
      emptyOutDir: true,

      rollupOptions: {
        input: {
          index: resolve(__dirname, "./index.html"),
        },
        external: [],
        output: {
          // manualChunks(id) {
          //   if (id.includes("node_modules/firebase/")) {
          //     return "firebase";
          //   }
          //   if (id.includes("node_modules/recharts/")) {
          //     return "recharts";
          //   }
          //   if (id.includes("node_modules/zustand/")) {
          //     return "zustand";
          //   }
          //   if (
          //     id.includes("node_modules/@tsparticles/engine/") ||
          //     id.includes("node_modules/@tsparticles/slim/") ||
          //     id.includes("node_modules/@tsparticles/react/") ||
          //     id.includes("node_modules/@tsparticles/preset-")
          //   ) {
          //     return "tsparticles-full";
          //   }
          //   if (id.includes("node_modules/qrcode.react/")) {
          //     return "qrcode.react";
          //   }
          //   if (id.includes("node_modules/notistack/")) {
          //     return "notistack";
          //   }
          //   if (
          //     id.includes("node_modules/react/") ||
          //     id.includes("node_modules/react-dom/")
          //   ) {
          //     return "react-dom";
          //   }
          //   if (
          //     id.includes("node_modules/i18next/") ||
          //     id.includes("node_modules/react-i18next/")
          //   ) {
          //     return "react-i18next";
          //   }
          //   if (
          //     id.includes("node_modules/immer/") ||
          //     id.includes("node_modules/use-immer/")
          //   ) {
          //     return "use-immer";
          //   }
          //   if (
          //     id.includes("node_modules/zod/") ||
          //     id.includes("node_modules/react-hook-form/") ||
          //     id.includes("node_modules/@hookform/resolvers/")
          //   ) {
          //     return "react-hook-form";
          //   }
          //   if (
          //     id.includes("node_modules/dexie/") ||
          //     id.includes("node_modules/dexie-react-hooks/")
          //   ) {
          //     return "dexie-react-hooks";
          //   }
          //   if (id.includes("node_modules/@tanstack/react-query/")) {
          //     return "tanstack-react-query";
          //   }
          //   if (id.includes("node_modules/@tanstack/react-table/")) {
          //     return "tanstack-react-table";
          //   }
          //   if (id.includes("node_modules/@tanstack/react-virtual/")) {
          //     return "tanstack-react-virtual";
          //   }
          //   if (id.includes("node_modules/@tanstack/react-form/")) {
          //     return "tanstack-react-form";
          //   }
          //   if (id.includes("node_modules/react-router/")) {
          //     return "react-router";
          //   }
          // },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },

      target: "baseline-widely-available",
      minify: "esbuild",

      cssTarget: ["es2020", "edge107", "firefox107", "chrome107", "safari16"],
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
        "/v1/chat/completions": {
          target: "https://spark-api-open.xf-yun.com",
          changeOrigin: true,
          ws: true,
        },
      },
      fs: {
        allow: [resolve(__dirname, "./")],
      },
    },
  };
});
