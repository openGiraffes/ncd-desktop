<template>
    <div class="ncd-homepage">
        <el-container>
            <el-aside>
                <img src="../assets/logo.png" alt="" srcset="" />
                <h1>Nine-colored Deer</h1>
                <div class="buttons-project">
                    <div class="button-create-project" @click="create_project()">
                        <el-button type="primary">{{ $t('ncd_ui.home.create_project')}}</el-button>
                    </div>
                    <div class="button-open-project" @click="open_project()">
                        <el-button>{{ $t('ncd_ui.home.open_project') }}</el-button>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <h1>{{ $t('ncd_ui.home.recent_project') }}</h1>
                <p>{{ $t('ncd_ui.home.recent_project_desc') }}</p>
                <a href="#"></a>
            </el-main>
            <CreateProjectDialog ref="project_dialog_visible"></CreateProjectDialog>
        </el-container>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { useRouter, useRoute } from 'vue-router'
import * as server from '../mocks/tree-mock-server'

import CreateProjectDialog from '../components/CreateProjectDialog.vue'

export default {
    name: 'HomePage'
}
</script>

<script setup>
const router = useRouter()
const project_dialog_visible = ref(null)
function create_project() {
    project_dialog_visible.value.show_dialog = true
}
function open_project() {
    const result = ipcRenderer.invoke('dialog:openProject')
    result.then(async (res) => {
        if (res !== undefined) {
            server.getFiles(res.replaceAll('\\', '\\\\'))
            localStorage.setItem('project_current', res.replaceAll('\\', '\\\\'))
            await router.push({ path: 'dev', query: { refresh: true }})
        } else {
            return
        }
    })
}
</script>

<style scoped>
.ncd-homepage {
    height: 100%;
}
.buttons-project {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.buttons-project > *,
.buttons-project .el-button {
    width: 100%;
    margin-bottom: 6px;
}
</style>
