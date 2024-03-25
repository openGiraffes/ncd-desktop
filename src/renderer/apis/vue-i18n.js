import { createI18n } from 'vue-i18n'
import * as stores from './electron-store.js'
// Init vue-i18n and lang files
import zh_CN from '../src/lang/zh_CN'
import en_US from '../src/lang/en_US'
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