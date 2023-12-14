import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import BaseSpinner from './components/ui/BaseSpinner.vue';
import { useUserStore } from './stores/user';

import App from './App.vue'
import router from './router'

const options = {};

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.component('base-spinner',BaseSpinner);
app.use(Toast, options);

const userStore = useUserStore();

router.beforeEach(async function(to, from, next) {
	console.log(userStore.token)
	if(to.path != '/' && userStore.token == null){
		next('/')
	}
	else{
	  next(); 
	}  
  });

app.mount('#app')
