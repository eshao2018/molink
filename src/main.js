import { createApp } from 'vue'
import App from './App.vue'
import router from "./utils/router";
import http from "./plugins/http";
import pinia from './store'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./utils/util";
import "./assets/main.css";

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(http);
app.use(ElementPlus);

app.mount('#app')
