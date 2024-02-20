import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import useToast from "vue-toastification";
import 'vue-toastification/dist/index.css'
import pinia from './plugins/pinia/index'
import dayjs from 'dayjs'
loadFonts()

createApp(App)
  .use(router)
  .use(pinia)
  .use(useToast)
  .use(vuetify)
  .mount('#app')
