<template>
    <div class="ncd-kaistore">
        <el-container>
            <el-header>
                <h1 v-if="is_loaded == true">KaiOS 应用商店</h1>
                <h1 v-else>加载失败</h1>
            </el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col
                        v-for="(kaios_app, index) in store_data.apps"
                        :key="kaios_app[index]"
                        :xs="24"
                        :sm="12"
                        :md="8"
                        :lg="6"
                        :xl="4"
                    >
                        <el-card 
                            class="ncd-store-card" 
                            body-class="ncd-store-card-body"
                            shadow="hover"
                            @click="open_store_app_info(kaios_app)"
                        >
                            <template #default>
                                <img :src="kaios_app.icon" alt="" width="60" height="60" />
                                <p class="ncd-store-apps-desc">
                                    <p style="font-weight: bold;">{{ kaios_app.name }}</p>
                                    {{ kaios_app.description }}
                                </p>
                            </template>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- <AppDialog ref="app_dialog_visible" :app_data="store_info"></AppDialog> -->
                <AppDialog ref="app_dialog_visible"></AppDialog>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import axios from 'axios'
import { ref, reactive } from 'vue'
import * as stores from '../apis/electron-store'
import kaistore_list from '../lists/kaistore_list'

import AppDialog from '../components/AppDialog.vue'

export default {
    name: 'KaiStorePage',
    components: { AppDialog },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            store_data: {},
            is_loaded: false
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
                axios.get(responseURL)
                    .then((result) => {
                        this.store_data = result.data
                        this.is_loaded = true
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<script setup>
const app_dialog_visible = ref(null)
// let store_info = reactive({})
function open_store_app_info(appdata) {
    // store_info = reactive(appdata)
    localStorage.setItem('app_data_cache', JSON.stringify(appdata))
    // console.log(store_info)
    app_dialog_visible.value.show_dialog = true
}
</script>

<style scoped>
.ncd-store-card {
    width: 100%;
    height: 130px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: space-around;
    justify-content: center;
}
:global(.ncd-store-card-body) {
    padding: 6px !important;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.ncd-store-apps-desc {
    width: 100%;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    margin-left: 10px;
}
</style>
