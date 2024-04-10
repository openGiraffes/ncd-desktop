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
import axios from 'axios'
import * as stores from '../apis/electron-store'
import kaistore_list from '../lists/kaistore_list'
export default {
    name: 'KaiStorePage'
}
</script>

<script setup>
onMounted(async () => {
    let store_channel = await stores.get_keys('kaistores')
    let responseURL = kaistore_list.kaistores[store_channel].url
    try {
        axios.get(responseURL).then(result => {
            console.log(result.data.version)
        }).catch(error => {
            console.log(error);
        })
    } catch (err) {
        console.log(err);
    }
})
</script>