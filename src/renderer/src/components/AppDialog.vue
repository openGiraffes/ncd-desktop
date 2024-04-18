<template>
    <el-dialog v-model="show_dialog" :title="app_data.name">
        <div class="ncd-app-fullinfo">
            <div class="ncd-app-logo"><img :src="app_data.icon" alt="" /></div>
            <div class="ncd-app-fulldesc">
                <p>{{ app_data.description }}</p>
            </div>

            <el-descriptions :column="1" :size="size" border>
                <el-descriptions-item label="分类">
                    <p class="app-data-array" v-for="(cat, index) in app_data.meta.categories">
                        {{ cat }}
                    </p>
                </el-descriptions-item>
                <el-descriptions-item label="作者">
                    <p class="app-data-array" v-for="(aut, index) in app_data.author">{{ aut }}</p>
                </el-descriptions-item>
                <el-descriptions-item label="维护者">
                    <p class="app-data-array" v-for="(maint, index) in app_data.maintainer">
                        {{ maint }}
                    </p>
                </el-descriptions-item>
                <el-descriptions-item label="依赖">{{
                    app_data.meta.dependencies
                }}</el-descriptions-item>
                <el-descriptions-item label="版本">{{
                    app_data.download.version
                }}</el-descriptions-item>
                <el-descriptions-item label="类型">{{ app_data.type }}</el-descriptions-item>
                <el-descriptions-item label="语言">
                    <p class="app-data-array" v-for="(lang, index) in app_data.locales">
                        {{ lang }}
                    </p>
                </el-descriptions-item>
                <el-descriptions-item label="敏感特征">
                    广告：{{ app_data.has_ads }} <br />
                    跟踪：{{ app_data.has_tracking }}
                </el-descriptions-item>
                <el-descriptions-item label="许可证">{{ app_data.license }}</el-descriptions-item>
                <el-descriptions-item label="网站">{{ app_data.website }}</el-descriptions-item>
            </el-descriptions>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="install_app_to_phone(app_data.download.kaistore)">安装到手机</el-button>
                <el-button @click="install_app_and_edit(app_data.download.omnisd, app_data.name)">安装并修改</el-button>
                <el-button @click="show_dialog = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import path from 'path'
import { ref, onMounted, defineProps, defineExpose } from 'vue'
import { installApp } from '../../../main/firefox-client/services/device';
import { downloadUrl } from '../../../main/firefox-client/services/browser';
import * as stores from '../apis/electron-store'
import * as fs from '../apis/fs'
import * as server from '../mocks/tree-mock-server'
import { useRouter, useRoute } from 'vue-router'
const AdmZip = require("adm-zip")

export default {
    name: 'AppDialog',
    data() {
        return {
            app_data: ''
        }
    },
    created() {
        // Difficult to understand passing parameters between components in Vue
        // So using LocalStorage as a cache (lll￢ω￢)
        let that = this //重定向 this 位置
        window.addEventListener('setCacheEvent', function (e) {
            if (e.key === 'app_data_cache') {
                that.app_data = JSON.parse(e.newValue)
                // console.log(that.app_data)
            }
        })
    }
}
</script>

<script setup>
const router = useRouter()
let show_dialog = ref(false)
async function install_app_to_phone(url) {
    console.log(url)
    await installApp(url).catch((err) => {
        console.log("Failed to install: " + err)
    })
    show_dialog.value = false
}

async function install_app_and_edit(url, appname) {
    let project_path = await stores.get_keys('project_path')
    let dest_path = project_path + "/" + appname
    downloadUrl(url)

    // For omnisd package only
    const zip = new AdmZip(project_path + "/" + path.basename(url))
    zip.extractAllTo(dest_path, true)
    const zip_application = new AdmZip(dest_path + "/application.zip")
    zip_application.extractAllTo(dest_path + "/application", true)
    fs.rmSync(dest_path + "/application.zip")

    setTimeout(() => {
        localStorage.setItem('project_current', dest_path)
        server.getFiles(dest_path)
        router.push({ path: 'dev', query: { refresh: true }})
        show_dialog.value = false
    }, 1000)
}

defineExpose({
    show_dialog
})
</script>

<style scoped>
.app-data-array {
    margin: 0;
}
</style>
