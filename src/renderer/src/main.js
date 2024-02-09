import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

import zh_CN from './lang/zh_CN'
import en_US from './lang/en_US'

const app = createApp(App)
const i18n = createI18n({
  locale: 'zh_CN',
  legacy: false,
  globalInjection: true,
  messages: {
    zh_CN,
    en_US
  }
})
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

app.use(i18n)
app.use(router)
app.mount('#app')
