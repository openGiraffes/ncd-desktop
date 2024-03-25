<template>
    <div class="ncd-settings">
        <el-container>
            <el-header>
                <h1>{{ $t('ncd_ui.sidebar_settings') }}</h1>
            </el-header>
            <el-main>
                <div class="ncd-settings-form">
                    <el-form ref="settings_ref" :model="settings_form" label-position="left">
                        <el-form-item :label="$t('ncd_ui.settings_adb_path')" class="form-adb-path">
                            <el-input v-model="settings_form.adb_path">
                                <template #suffix>
                                    <el-link type="primary" @click="set_adb_path">{{ $t('ncd_general.select_path') }}</el-link>
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
import * as stores from '../../apis/electron-store'

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
        if(res !== undefined){
            settings_form.adb_path = res
            stores.set_keys('adb_path', res)
        } else {
            return
        }
        
    })
}
onMounted(async () => {
    settings_form.adb_path = await stores.get_keys('adb_path')
})
</script>

<style scoped>

</style>