import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import * as ncd_monaco from './monaco-editor-main'

import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

ncd_monaco.ncd_monaco_editor_init()

const app = createApp(App)

// Init vue-i18n and lang files
import zh_CN from './lang/zh_CN'
import en_US from './lang/en_US'
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
app.use(VueMonacoEditorPlugin)
app.mount('#app')
