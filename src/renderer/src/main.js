import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import i18n from './apis/vue-i18n'
import * as ncd_monaco from './monaco-editor-main'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
import dispatch_app_data_cache from './apis/watch-app-cache'

ncd_monaco.ncd_monaco_editor_init()

const app = createApp(App)

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

app.use(i18n)
app.use(router)
app.use(VueMonacoEditorPlugin)
app.use(dispatch_app_data_cache)
app.mount('#app')
