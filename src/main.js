import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import BaseSpinner from './components/ui/BaseSpinner.vue';

import App from './App.vue'
import router from './router'

const options = {
	
};

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('base-spinner',BaseSpinner);
app.use(Toast, options);

app.mount('#app')
