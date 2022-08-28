import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({
      supportTs: false,
      logger: false,
      mockPath: "./src/mock/",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        // api开头的走代理
        target: "http://backend-api-02.newbee.ltd/manage-api/v1",
        changeOrigin: true,
        // 确认换源  api换成“”
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/echart": {
        target: "https://echarts.apache.org/examples",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/echart/, ""),
      },
      // ttp://localhost:3000/echart
      // "http://localhost:3000/echart": {
      //   target: "https://echarts.apache.org/examples",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },
    host: "0.0.0.0",
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
