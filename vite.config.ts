import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        // api开头的走代理
        // 代理到4000
        target:
          " https://mock.mengxuegu.com/mock/626187810a65bd50bbd93ddf/example",
        changeOrigin: true,
        // 确认换源  api换成“”
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 配置全局scss变量
        additionalData: `@import "@/styles/variable.scss";`,
      },
    },
  },
});
