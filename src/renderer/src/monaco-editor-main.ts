import { loader } from '@guolao/vue-monaco-editor'
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import { useMonaco } from 'monaco-tree-editor'
import * as server from './mocks/tree-mock-server'

function ncd_monaco_editor_init() {
    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === 'json' || label === 'webapp') {
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
        },
        globalAPI: true
    }
    // loader.config({ monaco })
    let monacoStore
    // 模拟延迟，测试健壮性 mock delay to test robustness
    server.delay().then(() => {
        monacoStore = useMonaco(monaco)
    })
}

export { ncd_monaco_editor_init }
