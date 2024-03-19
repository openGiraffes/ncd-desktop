<template>
    <div class="ncd-settings">
        <el-container>
            <el-header>
                <h1>{{ $t('ncd_ui.sidebar_settings') }}</h1>
            </el-header>
            <el-main>
                <div class="ncd-settings-form">
                    <el-form ref="settings_ref" :model="settings_form" label-width="auto">
                        <el-form-item :label="$t('ncd_ui.settings_adb_path')">
                            <el-input v-model="settings_form.adb_path"/>
                            <el-button type="primary" @click="set_adb_path">{{ $t('ncd_general.select_path') }}</el-button>
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
import * as stores from '../apis/electron-store'

export default {
    name: 'SettingsPage',
}
</script>

<script setup>
const settings_form = reactive({
    adb_path: ''
})

const set_adb_path = () => {
    const result = ipcRenderer.invoke('dialog:openFile');
    result.then((res) => {
        settings_form.adb_path = res
        stores.set_keys('adb_path', res)
    })
}
onMounted(async () => {
    settings_form.adb_path = await stores.get_keys('adb_path')
})
</script>