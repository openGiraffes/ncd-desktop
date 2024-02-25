import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

//Monaco Editor Workers
import { loader } from "@guolao/vue-monaco-editor"
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
import * as monaco from "monaco-editor"
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        return new editorWorker()
    }
}
loader.config({ monaco })

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
