import { createApp } from 'vue'
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import App from './App.vue'
import router from './router' 

const app = createApp(App);

app.use(router).mount('#app')
app.config.globalProperties.$apiKey = process.env.VUE_APP_API_KEY;
