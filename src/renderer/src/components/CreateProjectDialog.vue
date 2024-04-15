<template>
    <el-dialog v-model="show_dialog" title="新建项目" class="ncd-create-project">
            <el-form ref="formRef" :model="project_form" label-width="auto"> 
                <el-form-item label="项目类型">
                    <el-radio-group
                        v-model="project_form.project_default"
                        class="ncd-create-project-selection"
                        @change="getModelValue"
                    >
                        <el-radio :label="1">Hello world</el-radio>
                        <el-radio :label="2">Privileged Empty App</el-radio>
                        <el-radio :label="3">Privileged App</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="project_form.project_name" />
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="project_form.project_author" />
                </el-form-item>
                <el-form-item label="项目包名">
                    <el-input v-model="project_form.project_meta" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="show_dialog = false">创建</el-button>
                </span>
            </template>
    </el-dialog>
</template>

<script>
import { ref, onMounted, defineProps, defineExpose } from 'vue'
import { shell } from 'electron'
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
let show_dialog = ref(false)
const project_form = reactive({
    project_default: 1,
    project_name: '',
    project_author: '',
    project_meta: ''
})

const getModelValue = () => {
    console.log(project_form.project_default)
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
