import './assets/main.css'

import { createBootstrap } from 'bootstrap-vue-next'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Add the necessary CSS
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(createBootstrap()) // Important

app.mount('#app')