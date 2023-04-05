import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import Toaster from '@meforma/vue-toaster'

import './assets/index.css'
import 'element-plus/dist/index.css'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(Toaster)

app.mount('#app')
