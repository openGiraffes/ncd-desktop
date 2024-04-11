<template>
    <div class="ncd-kaistore">
        <el-container>
            <el-header></el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col v-for="(app, index) in store_data.apps" :key="app[index]" 
                        :xs="24" :sm="12" :md="8" :lg="6" :xl="4"
                    >
                        <el-card class="ncd-store-card" body-class="ncd-store-card-body">
                            <template #header>
                                <div class="ncd-store-card-header"><span>{{ app.name }}</span></div>
                            </template>
                            <template #default>
                                <img :src="app.icon" alt="" width="60" height="60">
                                <p class="ncd-store-apps-desc">{{ app.description }}</p>
                            </template>
                            <template #footer>
                                <el-button plain @click="ncd_store_apps_dialog = true">应用信息</el-button>
                            </template>
                        </el-card>
                    </el-col>
                </el-row>
                <el-dialog v-model="ncd_store_apps_dialog" title="Shipping address">
                    <main>container</main>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="ncd_store_apps_dialog = false">Cancel</el-button>
                            <el-button type="primary" @click="ncd_store_apps_dialog = false"> Confirm </el-button>
                        </span>
                    </template>
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import axios from 'axios'
import * as stores from '../apis/electron-store'
import kaistore_list from '../lists/kaistore_list'
export default {
    name: 'KaiStorePage',
    data() {
        return {
            store_data: {},
        }
    },
    created() {
        this.get_store_data_static()
    },
    methods: {
        async get_store_data_static() {
            let store_channel = await stores.get_keys('kaistores')
            let responseURL = kaistore_list.kaistores[store_channel].url
            try {
                axios.get(responseURL).then((result) => {
                    this.store_data = result.data
                }).catch(error => {
                    console.log(error);
                })
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>
<script setup>
let ncd_store_apps_dialog = ref(false)
</script>

<style scoped>
.ncd-store-card {
    width: 100%;
    height: 250px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: space-around;
    justify-content: space-between;
}
:global(.ncd-store-card-body){
    padding: 6px!important;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.ncd-store-apps-desc {
    text-overflow : ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:4; 
    overflow: hidden;
    margin-left: 10px;
}
</style>