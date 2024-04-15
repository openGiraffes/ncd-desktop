<template>
    <div class="ncd-monaco-dev">
        <el-header class="ncd-monaco-toolbar">
            <el-button @click="let_run_app">
                <i-ep-video-play />运行
            </el-button>
            <el-button>
                <i-ep-refresh-right />重新部署
            </el-button>
        </el-header>
        <el-main class="ncd-monaco-editor">
            <MonacoTreeEditor
                :font-size="14"
                :files="files"
                :sider-min-width="240"
                filelist-title="文件列表"
                @reload="handleReload"
                @new-file="handleNewFile"
                @new-folder="handleNewFolder"
                @save-file="handleSaveFile"
                @delete-file="handleDeleteFile"
                @delete-folder="handleDeleteFolder"
                @rename-file="handleRename"
                @rename-folder="handleRename"
                language="zh-CN"
            ></MonacoTreeEditor>
        </el-main>
    </div>
</template>

<script lang="ts">
export default {
    name: 'DevPage'
}
</script>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Editor as MonacoTreeEditor, Files } from 'monaco-tree-editor'
import { useRouter, useRoute } from 'vue-router'
import 'monaco-tree-editor/index.css'
import * as server from '../mocks/tree-mock-server'
import { installLocalApp } from '../../../main/firefox-client/services/device'
import { install } from '../apis/gdeploy'

const router = useRouter()

// Monaco tree Start
const files = ref<Files>()
const handleReload = (resolve: () => void, reject: (msg?: string) => void) => {
    server
        .fetchFiles()
        .then((response) => {
            files.value = response
            resolve()
        })
        .catch((e: Error) => {
            reject(e.message)
        })
}
const handleSaveFile = (
    path: string,
    content: string,
    resolve: () => void,
    reject: (msg?: string) => void
) => {
    server
        .createOrSaveFile(path, content)
        .then((_response) => {
            resolve()
        })
        .catch((e: Error) => {
            reject(e.message)
        })
}
const handleDeleteFile = (path: string, resolve: () => void, reject: (msg?: string) => void) => {
    server
        .deleteFile(path)
        .then((_response) => {
            resolve()
        })
        .catch((e: Error) => {
            reject(e.message)
        })
}
const handleDeleteFolder = (path: string, resolve: () => void, reject: (msg?: string) => void) => {
    reject('Operation of delete folder is not supported!')
}
const handleNewFile = (path: string, resolve: Function, reject: Function) => {
    server
        .newFile(path)
        .then((_response) => {
            resolve()
        })
        .catch((e: Error) => {
            reject(e.message)
        })
}
const handleNewFolder = (path: string, resolve: Function, reject: Function) => {
    server
        .newFolder(path)
        .then((_response) => {
            resolve()
        })
        .catch((e: Error) => {
            reject(e.message)
        })
}
const handleRename = (
    path: string,
    newPath: string,
    resolve: () => void,
    reject: (msg?: string) => void
) => {
    server
        .rename(path, newPath)
        .then((_response) => {
            resolve()
        })
        .catch((e: Error) => {
            reject(e.message)
        })
}
// Monaco tree end
router.afterEach(() => {
    handleReload() // Refresh list, please ignore error
})

const let_run_app = async () => {
    await install(localStorage.getItem('project_current'))
}
</script>

<style scoped>
.ncd-monaco-dev {
    height: 100%;
    padding: 0!important;
}
.ncd-monaco-toolbar {
    text-align: right;
    height: auto!important;
    padding: 0!important;
}
.ncd-monaco-editor {
    height: 96%;
    padding: 0!important;
    text-align: left!important;
}
</style>
