<template>
    <div class="ncd-settings">
        <el-container>
            <el-header>
                <h1>{{ $t('ncd_ui.sidebar_settings') }}</h1>
            </el-header>
            <el-main>
                <div class="ncd-settings-form">
                    <el-form ref="settings_ref" :model="settings_form" label-position="left">
                        <el-form-item :label="$t('ncd_ui.settings_locale')">
                            <el-select 
                                v-model="settings_form.locale"
                                @change="set_locale(settings_form.locale)"
                            >
                                <el-option
                                    v-for="(item, index) in locales_list.locales"
                                    :key="item.code"
                                    :label="item.desc"
                                    :value="item.code"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('ncd_ui.settings_kaistores')">
                            <el-select 
                                v-model="settings_form.kaistores"
                                @change="set_kaistores(settings_form.kaistores)"
                            >
                                <el-option
                                    v-for="(item, index) in kaistore_list.kaistores"
                                    :key="item.desc"
                                    :label="item.fulldesc"
                                    :value="item.code"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('ncd_ui.settings_adb_path')">
                            <el-input v-model="settings_form.adb_path">
                                <template #suffix>
                                    <el-link type="primary" @click="set_adb_path">{{ $t('ncd_general.select_path') }}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('ncd_ui.settings_python_path')">
                            <el-input v-model="settings_form.python_path">
                                <template #suffix>
                                    <el-link type="primary" @click="set_python_path">{{ $t('ncd_general.select_path') }}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('ncd_ui.settings_kailive_path')">
                            <el-input v-model="settings_form.kailive_path">
                                <template #suffix>
                                    <el-link type="primary" @click="set_kailive_path">{{ $t('ncd_general.select_path') }}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('ncd_ui.settings_download_path')">
                            <el-input v-model="settings_form.download_path">
                                <template #suffix>
                                    <el-link type="primary" @click="set_download_path">{{ $t('ncd_general.select_path') }}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('ncd_ui.settings_firefox_xul_path')">
                            <el-input v-model="settings_form.firefox_xul_path">
                                <template #suffix>
                                    <el-link type="primary" @click="set_firefox_xul_path">{{ $t('ncd_general.select_path') }}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('ncd_ui.settings_firefox_quantum_path')">
                            <el-input v-model="settings_form.firefox_quantum_path">
                                <template #suffix>
                                    <el-link type="primary" @click="set_firefox_quantum_path">{{ $t('ncd_general.select_path') }}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { onMounted } from 'vue'
import i18n from '../apis/vue-i18n'
import * as stores from '../apis/electron-store'
import locales_list from '../lists/locale_list'
import kaistore_list from '../lists/kaistore_list'

export default {
    name: 'SettingsPage',
}
</script>

<script setup>
const settings_form = reactive({
    locale: '',
    kaistores: '',
    adb_path: '',
    python_path: '',
    kailive_path: '',
    download_path: '',
    firefox_xul_path: '',
    firefox_quantum_path: ''
})

const set_adb_path = () => {
    const result = ipcRenderer.invoke('dialog:openFolder');
    result.then((res) => {
        if(res !== undefined){
            settings_form.adb_path = res
            stores.set_keys('adb_path', res)
        } else {
            return
        }
        
    })
}

const set_python_path = () => {
    const result = ipcRenderer.invoke('dialog:openFolder');
    result.then((res) => {
        if(res !== undefined){
            settings_form.python_path = res
            stores.set_keys('python_path', res)
        } else {
            return
        }
        
    })
}

const set_kailive_path = () => {
    const result = ipcRenderer.invoke('dialog:openFolder');
    result.then((res) => {
        if(res !== undefined){
            settings_form.kailive_path = res
            stores.set_keys('kailive_path', res)
        } else {
            return
        }
        
    })
}

const set_download_path = () => {
    const result = ipcRenderer.invoke('dialog:openFolder');
    result.then((res) => {
        if(res !== undefined){
            settings_form.download_path = res
            stores.set_keys('download_path', res)
        } else {
            return
        }
        
    })
}

// firefox_xul_path works with Firefox 59.0 and earlier versions,
// as well as browsers based on older versions (e.g. Waterfox Classic).
const set_firefox_xul_path = () => {
    const result = ipcRenderer.invoke('dialog:openFile');
    result.then((res) => {
        if(res !== undefined){
            settings_form.firefox_xul_path = res
            stores.set_keys('firefox_xul_path', res)
        } else {
            return
        }
        
    })
}
// firefox_quantum_path works with Firefox 59.0 and newer versions.
const set_firefox_quantum_path = () => {
    const result = ipcRenderer.invoke('dialog:openFile');
    result.then((res) => {
        if(res !== undefined){
            settings_form.firefox_quantum_path = res
            stores.set_keys('firefox_quantum_path', res)
        } else {
            return
        }
        
    })
}

const set_locale = async (loc) => {
    settings_form.locale = loc
    i18n.global.locale.value = loc
    await stores.set_keys('locale', loc)
}

const set_kaistores = async (st) => {
    settings_form.kaistores = st
    await stores.set_keys('kaistores', st)
}

onMounted(async () => {
    settings_form.adb_path = await stores.get_keys('adb_path')
    settings_form.python_path = await stores.get_keys('python_path')
    settings_form.kailive_path = await stores.get_keys('kailive_path')
    settings_form.download_path = await stores.get_keys('download_path')
    settings_form.firefox_xul_path = await stores.get_keys('firefox_xul_path')
    settings_form.firefox_quantum_path = await stores.get_keys('firefox_quantum_path')
    settings_form.locale = await stores.get_keys('locale')
    settings_form.kaistores = await stores.get_keys('kaistores')
})
</script>

<style scoped>

</style>