<template>
    <div class="ncd-tools-packagezip">
        <el-container>
            <el-header class="ncd-tools-title">
                <el-button v-on:click="this.$router.back()">
                    <el-icon><i-ep-arrow-left /></el-icon>
                    返回
                </el-button>
                {{ $t('ncd_ui.tools_packagezip') }}
            </el-header>
            <el-main>
                <div class="ncd-tools-package-form">
                    <el-form ref="formRef" :model="package_form" label-width="auto">
                        <el-form-item label="打包类型">
                            <el-radio-group v-model="package_form.package_default" class="ncd-tools-package-selection"
                                @change="getModelValue">
                                <el-radio :label="1">KaiStore</el-radio>
                                <el-radio :label="2">OmniSD</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="项目目录">
                            <el-input v-model="package_form.project_path" />
                            <el-button type="primary" @click="get_project_folder">选择目录</el-button>
                        </el-form-item>
                        <el-form-item label="保存位置">
                            <el-input v-model="package_form.package_savepath" />
                            <el-button type="primary" @click="get_save_folder">选择目录</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="submitPackage">
                        打包
                    </el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    name: 'PackageZip',
    created(){
        ipcRenderer.on('save-finished', function (event, filename) {
            console.log(filename)
        })
    }
}
</script>

<script setup>
const package_form = reactive({
    package_default: 1,
    project_path: "",
    package_savepath: ""
})

const getModelValue = () => {
    console.log(package_form.package_default)
}

const get_project_folder = () => {
    const result = ipcRenderer.invoke('dialog:openFile');
    result.then(res => {
        package_form.project_path = res
    })
}

const get_save_folder = () => {
    const result = ipcRenderer.invoke('dialog:openFile');
    result.then(res => {
        package_form.package_savepath = res
    })
}

const submitPackage = () => {
    console.log("Packaged!")
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