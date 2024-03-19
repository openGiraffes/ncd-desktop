import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import commonjsExternals from 'vite-plugin-commonjs-externals'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import optimizer from 'vite-plugin-optimizer'

import { getReplacer } from './plugins/importInternal'

const path_src = resolve(__dirname, 'src/renderer')
const externals = ['fs', 'path', 'require', /^electron(\/.+)?$/]
export default defineConfig({
    optimizeDeps: {
        include: [
            `monaco-editor/esm/vs/language/json/json.worker`,
            `monaco-editor/esm/vs/language/css/css.worker`,
            `monaco-editor/esm/vs/language/html/html.worker`,
            `monaco-editor/esm/vs/language/typescript/ts.worker`,
            `monaco-editor/esm/vs/editor/editor.worker`
        ],
        exclude: externals
    },
    main: {
        plugins: [
            externalizeDepsPlugin(),
            commonjsExternals({
                externals: externals
            })
        ]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        plugins: [
            vue(),
            optimizer(getReplacer()),
            AutoImport({
                imports: ['vue'],
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'Icon'
                    })
                ],
                dts: resolve(path_src, 'auto-imports.d.ts')
            }),
            Components({
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        enabledCollections: ['ep']
                    })
                ],
                dts: resolve(path_src, 'components.d.ts')
            }),
            Icons({
                autoInstall: true
            }),
            VueI18nPlugin({
                /* options */
            })
        ]
    }
})
