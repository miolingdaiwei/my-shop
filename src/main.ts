import { createApp } from "vue";
import { createPinia } from "pinia";
import elementPlus from "./plugins/element-plus";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(elementPlus);
app.use(pinia);
app.mount("#app");
