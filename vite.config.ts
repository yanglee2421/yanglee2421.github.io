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

    // Path Alias
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    // CSS Configuration
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

    // Env File Directory
    envDir: resolve(__dirname, "./"),

    // Build Configuration
    build: {
      outDir: resolve(__dirname, "./docs"),
      emptyOutDir: true,

      sourcemap: false,
      chunkSizeWarningLimit: 500,

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

      cssTarget: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
      cssMinify: true,
      cssCodeSplit: true,

      target: "modules",
      minify: "esbuild",
    },

    // Dev Server
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
      fs: {
        allow: [resolve(__dirname, "../../")],
      },
      // https: {
      //   cert: "",
      //   key: "",
      // },
    },
  };
});
