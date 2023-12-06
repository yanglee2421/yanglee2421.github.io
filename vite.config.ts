// Vite Imports
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// NodeJs Imports
import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const isBuild = configEnv.command === "build";

  return {
    plugins: [react()],

    // Path alias
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    // CSS configuration
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

    // Base URI
    base: isBuild ? "./" : "/react-mui",

    // Env file directory
    envDir: resolve(__dirname, "./"),

    // Build configuration
    build: {
      outDir: resolve(__dirname, "./docs"),
      emptyOutDir: true,

      chunkSizeWarningLimit: 500,
      sourcemap: false,

      rollupOptions: {
        input: {
          index: resolve(__dirname, "./index.html"),
        },
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/cropperjs")) {
              return "cropperjs";
            }

            if (id.includes("node_modules/fabric")) {
              return "fabric";
            }
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },

    // DEV Server
    server: {
      port: 3006,
      strictPort: true,
      hmr: {
        port: 3006,
      },
      proxy: {
        "/api": {
          target: "https://data-warpdriven.warpdriven.ai",
          rewrite(path) {
            return path.replace(/^\/dev/, "");
          },
          changeOrigin: true,
          ws: true,
        },
      },
      fs: { allow: [resolve(__dirname, "../../")] },
      // https: {
      //   cert: "",
      //   key: "",
      // },
    },
  };
});
