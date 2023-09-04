import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.config.globalProperties.$apiKey = process.env.VUE_APP_API_KEY;
app.mount('#app')
