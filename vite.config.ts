import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ReactCompilerConfig = {
  target: "19", // '17' | '18' | '19'
};

// https://vitejs.dev/config/
export default defineConfig(() => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

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
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "#": fileURLToPath(new URL("./", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss" as *;`,
        },
      },
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },

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
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/firebase/")) {
              return "firebase";
            }
            if (id.includes("node_modules/recharts/")) {
              return "recharts";
            }
            if (id.includes("node_modules/react/")) {
              return "react";
            }
            if (id.includes("node_modules/react-dom/")) {
              return "react-dom";
            }
            if (id.includes("node_modules/zustand/")) {
              return "zustand";
            }
            if (id.includes("node_modules/@tsparticles/engine/")) {
              return "tsparticles-engine";
            }
            if (id.includes("node_modules/@tsparticles/slim/")) {
              return "tsparticles-slim";
            }
            if (id.includes("node_modules/@tsparticles/react/")) {
              return "tsparticles-react";
            }
            if (id.includes("node_modules/@tsparticles/preset-")) {
              return "tsparticles-perset";
            }
            if (id.includes("node_modules/@tsparticles/preset-")) {
              return "tsparticles-perset";
            }
            if (id.includes("node_modules/qrcode.react/")) {
              return "qrcode.react";
            }
            if (id.includes("node_modules/i18next/")) {
              return "i18next";
            }
            if (id.includes("node_modules/react-i18next/")) {
              return "react-i18next";
            }
            if (id.includes("node_modules/immer/")) {
              return "immer";
            }
            if (id.includes("node_modules/use-immer/")) {
              return "use-immer";
            }
            if (id.includes("node_modules/notistack/")) {
              return "notistack";
            }
            if (id.includes("node_modules/@tanstack/react-query/")) {
              return "tanstack-react-query";
            }
            if (id.includes("node_modules/@tanstack/react-table/")) {
              return "tanstack-react-table";
            }
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },

      target: "modules",
      minify: "esbuild",

      cssTarget: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
      cssMinify: "esbuild",
      cssCodeSplit: true,
      // lib: { cssFileName: "style.css" },

      manifest: true,
      sourcemap: false,
      chunkSizeWarningLimit: 500,
      assetsInlineLimit: 0,
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
