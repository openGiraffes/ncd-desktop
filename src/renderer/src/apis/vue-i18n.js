import { createI18n } from 'vue-i18n'
import * as stores from './electron-store.js'
// Init vue-i18n and lang files
import zh_CN from '../lang/zh_CN.js'
import en_US from '../lang/en_US.js'
const i18n = createI18n({
    locale: await stores.get_keys('locale'),
    fallbackLocale: 'en_US',
    legacy: false,
    globalInjection: true,
    messages: {
        zh_CN,
        en_US
    }
})

export default i18n
