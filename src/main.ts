import { createApp } from 'vue'
import './styles/main.sass'
// @ts-ignore
import App from './App.vue'
import router from "./routes/routes.ts";

createApp(App)
    .use(router)
    .mount('#app')
