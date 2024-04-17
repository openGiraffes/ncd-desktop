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
                        <el-form-item :label="$t('ncd_ui.tools.packagezip.project_path')">
                            <el-input v-model="package_form.project_path">
                                <template #suffix>
                                    <el-link type="primary"
                                        @click="get_project_folder"
                                    >{{ $t('ncd_general.select_path') }}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('ncd_ui.tools.packagezip.save_path')">
                            <el-input v-model="package_form.package_savepath">
                                <template #suffix>
                                    <el-link type="primary"
                                        @click="get_save_folder"
                                    >{{ $t('ncd_general.select_path') }}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="package_open_save" 
                                :label="$t('ncd_ui.tools.packagezip.opensave')" 
                            />
                        </el-form-item>
                        <el-button type="primary" @click="submitPackage">
                            {{ $t('ncd_ui.tools.packagezip.submit') }}
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
// import * as fs from '../../apis/fs'
import { ElMessage } from 'element-plus';
import fs from 'fs'
const archiver = require('archiver'); // archiver currently only support CommonJS

const package_open_save = ref(false)
const package_default = ref("kaistore")
const package_form = reactive({
    project_path: '',
    package_savepath: ''
})

const getModelValue = () => {
    console.log(package_default)
}

const get_project_folder = () => {
    const result = ipcRenderer.invoke('dialog:openFolder')
    result.then((res) => {
        package_form.project_path = res
    })
}

const get_save_folder = () => {
    const result = ipcRenderer.invoke('dialog:openFolder')
    result.then((res) => {
        package_form.package_savepath = res
    })
}

const submitPackage = () => {
    const archive = archiver('zip', { zlib: { level: 9 } })
    let output_package
    switch (package_default.value) {
        case "kaistore":
            output_package = fs.createWriteStream(package_form.package_savepath + "/app-kaistore.zip")
            archive.pipe(output_package)
            archive.directory(package_form.project_path + '/application/', false)
            archive.finalize()
            console.log('Packaged!')
            ElMessage({
                message: '打包成功',
                type: 'success'
            })
            break

        case "omnisd":
            output_package = fs.createWriteStream(package_form.package_savepath + "/app-omnisd.zip")
            archive.pipe(output_package)
            archive.directory(package_form.project_path + '/', false)
            archive.finalize()
            console.log('Packaged!')
            ElMessage({
                message: '打包成功',
                type: 'success'
            })
            break
    }
    if (package_open_save.value === true) {
        shell.openPath(package_form.package_savepath)
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
