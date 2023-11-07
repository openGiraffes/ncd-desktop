import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

const app = createApp(App)
const i18n = createI18n({
    locale: 'zh_CN',
    legacy: false,
    globalInjection: true,
    messages: {
        'zh_CN': require("./i18n/zh_CN"),
        'en_US': require("./i18n/en_US")
    }
})

app.use(i18n)
app.mount('#app')
