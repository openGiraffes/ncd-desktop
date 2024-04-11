<template>
    <el-dialog v-model="show_dialog" :title="app_data.name">
        <div class="ncd-app-fullinfo">
            <div class="ncd-app-logo"><img :src="app_data.icon" alt=""></div>
            <div class="ncd-app-fulldesc"><p>{{ app_data.description }}</p></div>
            <el-descriptions
                :column="1"
                :size="size"
                border
            >
                <el-descriptions-item label="分类">
                    <p class="app-data-array" v-for="(cat, index) in app_data.meta.categories">{{ cat }}</p>
                </el-descriptions-item>
                <el-descriptions-item label="作者">
                    <p class="app-data-array" v-for="(aut, index) in app_data.author">{{ aut }}</p>
                </el-descriptions-item>
                <el-descriptions-item label="维护者">
                    <p class="app-data-array" v-for="(maint, index) in app_data.maintainer">{{ maint }}</p>
                </el-descriptions-item>
                <el-descriptions-item label="依赖">{{ app_data.meta.dependencies }}</el-descriptions-item>
                <el-descriptions-item label="版本">{{ app_data.download.version }}</el-descriptions-item>
                <el-descriptions-item label="类型">{{ app_data.type }}</el-descriptions-item>
                <el-descriptions-item label="语言">
                    <p class="app-data-array" v-for="(lang, index) in app_data.locales">{{ lang }}</p>
                </el-descriptions-item>
                <el-descriptions-item label="敏感特征">
                    广告：{{ app_data.has_ads }} <br>
                    跟踪：{{ app_data.has_tracking }}
                </el-descriptions-item>
                <el-descriptions-item label="许可证">{{ app_data.license }}</el-descriptions-item>
                <el-descriptions-item label="网站"><a @click="app_data_website_click(app_data.website)" :href="app_data.website">{{ app_data.website }}</a></el-descriptions-item>
            </el-descriptions>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="show_dialog = false">安装到手机</el-button>
                <el-button @click="show_dialog = false">安装并修改</el-button>
                <el-button @click="show_dialog = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { ref, onMounted, defineProps, defineExpose } from 'vue'
import { shell } from 'electron';
export default {
    name: 'AppDialog',
    data() {
        return {
            
        }
    }
}
</script>

<script setup>
let show_dialog = ref(false)
//let app_data = defineProps(['app_data'])

// Difficult to understand passing parameters between components in Vue
// So using LocalStorage as a cache (lll￢ω￢)
let app_data = localStorage.getItem("app_data_cache")
window.addEventListener('setCacheEvent', function (e) {
    if (e.key === 'app_data_cache') {
        app_data = JSON.parse(e.newValue)
        // console.log(app_data)
    }
})
function app_data_website_click(link) {
    shell.openExternal(link)
}

defineExpose({
    show_dialog
})
</script>

<style scoped>
.app-data-array{
    margin: 0
}
</style>