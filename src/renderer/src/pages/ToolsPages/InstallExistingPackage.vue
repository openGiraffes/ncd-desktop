<template>
    <div class="ncd-tools-installzip">
        <el-container>
            <el-header class="ncd-tools-title">
                <el-button v-on:click="this.$router.back()">
                    <el-icon><i-ep-arrow-left /></el-icon>
                    {{ $t('ncd_general.back') }}
                </el-button>
                {{ $t('ncd_ui.tools.installzip.title') }}
            </el-header>
            <el-main>
                <div class="ncd-tools-installzip-form">
                    <el-form ref="formRef" :model="package_form" label-width="auto">
                        <el-form-item :label="$t('ncd_ui.tools.installzip.radio')">
                            <el-radio-group v-model="package_default" class="ncd-tools-package-selection"
                                @change="getModelValue">
                                <el-radio-button label="KaiStore" value="kaistore" />
                                <el-radio-button label="OmniSD" value="omnisd" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('ncd_ui.tools.installzip.path')">
                            <el-input v-model="package_form.local_path">
                                <template #suffix>
                                    <el-link type="primary"
                                        @click="get_package_file"
                                    >{{ $t('ncd_general.select_path') }}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-button type="primary" @click="installPackage">
                            {{ $t('ncd_ui.tools.installzip.submit') }}
                        </el-button>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { ipcRenderer, shell } from 'electron'

export default {
    name: 'InstallExistingPackage',
    created() {
        ipcRenderer.on('save-finished', function (event, filename) {
            console.log(filename)
        })
    }
}
</script>

<script setup>
import fs from 'fs'
import * as stores from '../../apis/electron-store'
import { installLocalApp } from '../../../../main/firefox-client/services/device';
const AdmZip = require("adm-zip")

const package_default = ref("kaistore")
const package_form = reactive({
    local_path: '',
})

const getModelValue = () => {
    console.log(package_default)
}

const get_package_file = () => {
    const result = ipcRenderer.invoke('dialog:openFile')
    result.then((res) => {
        package_form.local_path = res
    })
}

const installPackage = async () => {
    let download_path = await stores.get_keys('download_path') + "/temp"
    switch(package_default.value) {
        case 'kaistore':
            installLocalApp(package_form.local_path)
            ElMessage({
                message: '(KaiStore) 安装成功，请到手机上查看',
                type: 'success'
            })
            break

        case 'omnisd':
            let zip = new AdmZip(package_form.local_path)
            zip.extractAllTo(download_path, true)
            installLocalApp(download_path + '/application.zip')
            ElMessage({
                message: '(OmniSD) 安装成功，请到手机上查看',
                type: 'success'
            })
            break
    }
}
</script>

<style scoped>
.ncd-tools-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.ncd-tools-package-path {
    display: flex;
    flex-direction: column;
}
</style>
