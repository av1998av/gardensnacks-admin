import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const options = {
	
};

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options);

app.mount('#app')
