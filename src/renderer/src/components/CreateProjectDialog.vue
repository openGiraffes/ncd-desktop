<template>
    <el-dialog v-model="show_dialog" title="新建项目" class="ncd-create-project" width="70%">
            <el-form ref="formRef" :model="project_form" label-width="auto"> 
                <el-form-item label="项目类型">
                    <el-radio-group
                        v-model="project_default"
                        class="ncd-create-project-selection"
                        @change="getModelValue"
                    >
                        <el-radio-button label="Hello world" value="helloworld"></el-radio-button>
                        <el-radio-button label="Privileged Empty App" value="privileged_empty"></el-radio-button>
                        <el-radio-button label="Privileged App" value="privileged"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="project_form.project_name" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit_create_project()">创建</el-button>
                </el-form-item>
            </el-form>
    </el-dialog>
</template>

<script>
import { ref, onMounted, defineProps, defineExpose } from 'vue'
import { shell } from 'electron'
import { useRouter, useRoute } from 'vue-router'
import * as server from '../mocks/tree-mock-server'
import * as fs from '../apis/fs'
import * as stores from '../apis/electron-store'

export default {
    name: 'AppDialog',
    data() {
        return {
            app_data: ''
        }
    },
    created() {}
}
</script>

<script setup>
let show_dialog = ref(false)
const router = useRouter()
let project_default = ref('helloworld')

const project_form = reactive({
    project_name: '',
    project_author: '',
    project_meta: ''
})

async function submit_create_project() {
    let projects_path = await stores.get_keys('project_path')
    let dest_path = projects_path + '\\' + project_form.project_name
    let templates = {
        helloworld: 'template/helloworld',
        privileged_empty: 'template/privileged-empty-app',
        privileged: 'template/privileged-app'
    }
    
    switch (project_default.value) {
        case 'helloworld':
            fs.cpSync(templates.helloworld, dest_path)
            console.log("Created!")
            break;
    
        case 'privileged_empty':
            fs.cpSync(templates.privileged_empty, dest_path)
            break;

        case 'privileged':
            fs.cpSync(templates.privileged, dest_path)
            break;
    }

    setTimeout(() => {
        localStorage.setItem('project_current', dest_path.replaceAll('\\', '\\\\'))
        server.getFiles(dest_path.replaceAll('\\', '\\\\'))
        router.push({ path: 'dev', query: { refresh: true }})
        show_dialog = ref(false)
    }, 1000)
}

const getModelValue = () => {
    console.log(project_default)
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
