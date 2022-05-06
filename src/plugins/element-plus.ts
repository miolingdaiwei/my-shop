import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import type { App } from "vue";

export default {
  install(app: App) {
    app.use(ElementPlus);
  },
};
