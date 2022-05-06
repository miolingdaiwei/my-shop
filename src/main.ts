import { createApp } from "vue";
import { createPinia } from "pinia";
import elementPlus from "./plugins/element-plus";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(elementPlus);
app.mount("#app");
