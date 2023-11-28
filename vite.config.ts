// Vite Imports
import { ConfigEnv, defineConfig, UserConfig } from "vite";
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

    // Build configuration
    build: build(configEnv),

    // DEV Server
    server: server(configEnv),

    // Env file directory
    envDir: resolve(__dirname, "./"),
  };
});

// Build configuration
function build(configEnv: ConfigEnv): UserConfig["build"] {
  void configEnv;

  const __dirname = dirname(fileURLToPath(import.meta.url));

  return {
    outDir: resolve(__dirname, "./docs"),
    emptyOutDir: true,

    chunkSizeWarningLimit: 500,
    sourcemap: false,

    rollupOptions: {
      input: {
        index: resolve(__dirname, "./index.html"),
      },
      output: {},
    },
  };
}

// Vite development server
function server(configEnv: ConfigEnv): UserConfig["server"] {
  void configEnv;

  const __dirname = dirname(fileURLToPath(import.meta.url));

  return {
    port: 3006,
    // proxy: {
    //   "/api": {
    //     ws: true,
    //     changeOrigin: true,
    //     target: "https://data-warpdriven.warpdriven.ai",
    //     rewrite(path) {
    //       return path.replace(/^\/dev/, "");
    //     },
    //   },
    // },
    fs: { allow: [resolve(__dirname, "../../")] },
    // https: {
    //   cert: "",
    //   key: "",
    // },
  };
}
