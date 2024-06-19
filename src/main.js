import { createApp } from "vue";
import "./assets/css/tailwind.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "preline/preline";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


const app = createApp(App);
app.use(createPinia());
app.use(Toast);
app.use(router);
app.mount("#app");
