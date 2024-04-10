<template>
    <div class="ncd-kaistore">
        <el-container>
            <el-header></el-header>
            <el-main>

            </el-main>
        </el-container>
    </div>
</template>
<script>
import { onMounted } from 'vue'
import { ipcRenderer } from 'electron'
import * as axios from 'axios'
import * as stores from '../apis/electron-store'
import kaistore_list from '../lists/kaistore_list'
export default {
    name: 'KaiStorePage'
}
</script>

<script lang="ts" setup>
onMounted(() => {
    let responseURL = kaistore_list.kaistores
})
</script>