<template>
    <div class="ncd-settings">
        <el-container>
            <el-header>
                <h1>{{ $t('ncd_ui.sidebar.settings') }}</h1>
            </el-header>
            <el-main>
                <div class="ncd-settings-form">
                    <el-form ref="settings_ref" :model="settings_form" label-position="left">
                        <el-tabs v-model="settings_activate" class="ncd-settings-tabs">
                            <!-- 通用设置 -->
                            <el-tab-pane :label="$t('ncd_ui.settings.general.title')" name="general">
                                <el-form-item :label="$t('ncd_ui.settings.general.locale')">
                                    <el-select v-model="settings_form.locale"
                                        @change="set_locale(settings_form.locale)">
                                        <el-option v-for="(item, index) in locales_list.locales" :key="item.code"
                                            :label="item.desc" :value="item.code" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$t('ncd_ui.settings.general.kaistores')">
                                    <el-select v-model="settings_form.kaistores"
                                        @change="set_kaistores(settings_form.kaistores)">
                                        <el-option v-for="(item, index) in kaistore_list.kaistores" :key="item.desc"
                                            :label="item.fulldesc" :value="item.code" />
                                    </el-select>
                                </el-form-item>
                            </el-tab-pane>
                            <!-- 环境设置 -->
                            <el-tab-pane :label="$t('ncd_ui.settings.env.title')" name="env">
                                <el-form-item :label="$t('ncd_ui.settings.env.adb_path')">
                                    <el-input v-model="settings_form.adb_path">
                                        <template #suffix>
                                            <el-link type="primary" @click="set_env_path('adb_path', 'dialog:openFolder')">{{
                                                $t('ncd_general.select_path')
                                                }}</el-link>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('ncd_ui.settings.env.python_path')">
                                    <el-input v-model="settings_form.python_path">
                                        <template #suffix>
                                            <el-link type="primary" @click="set_env_path('python_path', 'dialog:openFolder')">{{
                                                $t('ncd_general.select_path')
                                                }}</el-link>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('ncd_ui.settings.env.gdeploy_path')">
                                    <el-input v-model="settings_form.gdeploy_path">
                                        <template #suffix>
                                            <el-link type="primary" @click="set_env_path('gdeploy_path', 'dialog:openFile')">{{
                                                $t('ncd_general.select_path')
                                                }}</el-link>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('ncd_ui.settings.env.kailive_path')">
                                    <el-input v-model="settings_form.kailive_path">
                                        <template #suffix>
                                            <el-link type="primary" @click="set_env_path('kailive_path', 'dialog:openFolder')">{{
                                                $t('ncd_general.select_path')
                                                }}</el-link>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('ncd_ui.settings.env.firefox_xul_path')">
                                    <el-input v-model="settings_form.firefox_xul_path"
                                        :placeholder="$t('ncd_ui_tips.settings_firefox_xul_path')"
                                    >
                                        <template #suffix>
                                            <el-link type="primary" @click="set_env_path('firefox_xul_path', 'dialog:openFile')">{{
                                                $t('ncd_general.select_path')
                                            }}</el-link>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('ncd_ui.settings.env.firefox_quantum_path')">
                                    <el-input v-model="settings_form.firefox_quantum_path" 
                                        :placeholder="$t('ncd_ui_tips.settings_firefox_quantum_path')"
                                    >
                                        <template #suffix>
                                            <el-link type="primary" @click="set_env_path('firefox_quantum_path', 'dialog:openFile')">{{
                                                $t('ncd_general.select_path')
                                            }}</el-link>
                                        </template>
                                    </el-input>
                                </el-form-item>
                            </el-tab-pane>
                            <!-- 个性化 -->
                            <el-tab-pane :label="$t('ncd_ui.settings.personal.title')" name="personal">
                                <el-form-item :label="$t('ncd_ui.settings.personal.download_path')">
                                    <el-input v-model="settings_form.download_path">
                                        <template #suffix>
                                            <el-link type="primary" @click="set_env_path('download_path', 'dialog:openFolder')">{{
                                                $t('ncd_general.select_path')
                                                }}</el-link>
                                        </template>
                                    </el-input>
                                </el-form-item>
                            </el-tab-pane>
                            <!-- 开发设置 -->
                            <el-tab-pane :label="$t('ncd_ui.settings.dev.title')" name="dev">
                                <el-form-item :label="$t('ncd_ui.settings.dev.project_path')">
                                    <el-input v-model="settings_form.project_path"
                                        :placeholder="$t('ncd_ui_tips.settings_project_path')"
                                    >
                                        <template #suffix>
                                            <el-link type="primary"
                                                @click="set_env_path('project_path', 'dialog:openFolder')"
                                            >{{ $t('ncd_general.select_path') }}</el-link>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('ncd_ui.settings.dev.goto_debug')">
                                    <el-checkbox 
                                        v-model="settings_form.goto_debug" 
                                        :label="$t('ncd_ui_tips.settings_goto_debug')"
                                        @click=""
                                    />
                                </el-form-item>
                            </el-tab-pane>
                        </el-tabs>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { ref, reactive, onMounted } from 'vue'
import i18n from '../apis/vue-i18n'
import * as stores from '../apis/electron-store'
import locales_list from '../lists/locale_list'
import kaistore_list from '../lists/kaistore_list'

export default {
    name: 'SettingsPage'
}
</script>

<script setup>
const settings_form = reactive({
    locale: '',
    kaistores: '',
    adb_path: '',
    python_path: '',
    kailive_path: '',
    gdeploy_path: '',         // ATTENSION: gdeploy and its dependencies are so old that you need to use binaries packaged 
                              // based on the v12.x environment before updating the code to be compatible with current
                              // Node.js version.
    download_path: '',
    firefox_xul_path: '',     // firefox_xul_path works with Firefox 59.0 and earlier versions,
                              // as well as browsers based on older versions (e.g. Waterfox Classic).
    firefox_quantum_path: '', // firefox_quantum_path works with Firefox 59.0 and newer versions.
    goto_debug: false,
    project_path: ''
})

const settings_activate = ref('general')



const set_env_path = (env, dialog) => {
    // dialog optional value: 'dialog:openFolder' | 'dialog:openFile'
    const result = ipcRenderer.invoke(dialog)
    result.then((res) => {
        if (res !== undefined) {
            settings_form[env] = res
            stores.set_keys(env, res)
        } else {
            console.log(res)
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
    settings_form.gdeploy_path = await stores.get_keys('gdeploy_path')
    settings_form.kailive_path = await stores.get_keys('kailive_path')
    settings_form.download_path = await stores.get_keys('download_path')
    settings_form.firefox_xul_path = await stores.get_keys('firefox_xul_path')
    settings_form.firefox_quantum_path = await stores.get_keys('firefox_quantum_path')
    settings_form.locale = await stores.get_keys('locale')
    settings_form.kaistores = await stores.get_keys('kaistores')
    settings_form.goto_debug = await stores.get_keys('goto_debug')
    settings_form.project_path = await stores.get_keys('project_path')
})
</script>

<style scoped></style>
