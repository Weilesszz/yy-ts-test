import 'normalize.css';
import { createApp } from "vue";
import App from "./App.vue";
import './assets/css/index.css';
import { registerApp } from './global/index';
import router from "./router/index";
import './service';
import store, { setupStore } from "./store/index";
const app = createApp(App)
app.use(registerApp)
app.use(store)
setupStore()
// path: /user => user
app.use(router)
app.mount("#app")
