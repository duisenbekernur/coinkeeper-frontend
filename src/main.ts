import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

import './assets/index.css'
import 'element-plus/dist/index.css'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(store)

// app.mixin({
//   beforeCreate() {
//     store.dispatch('cards/fetchCards')
//   }
// })

app.mount('#app')
