// main.ts

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import useToast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createPinia } from 'pinia';

loadFonts();


// Use Pinia before other plugins and the router
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app
  .use(router)
  .use(useToast, {
    position: 'top-right',
    timeout: 1500,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
  })
  .use(vuetify)
  .mount('#app');
