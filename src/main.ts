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
  .use(useToast, {
    position: 'top-right',
    timeout: 1500,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
  })
  .use(vuetify)
  .mount('#app')
