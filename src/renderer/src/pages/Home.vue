<template>
    <div class="ncd-homepage">
        <el-container>
            <el-aside>
                <img src="../assets/logo.png" alt="" srcset="">
                <h1>Nine-colored Deer</h1>
                <div class="buttons-project">
                    <div class="button-create-project">
                        <el-button type="primary" @click="click_filepath()">{{ $t('ncd_ui.home_create_project') }}</el-button>
                    </div>
                    <div class="button-open-project">
                        <el-button>{{ $t('ncd_ui.home_open_project') }}</el-button>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <h1>{{ $t('ncd_ui.home_recent_project') }}</h1>
                <p>{{ $t('ncd_ui.home_recent_project_desc') }}</p>
            </el-main>
        </el-container>
    </div>
</template>

<script>

import { ipcRenderer } from 'electron'
export default {
    name: 'HomePage'
}
</script>

<script setup>
function click_filepath() {
    const result = ipcRenderer.invoke('dialog:openFolder');
    result.then((res) => {
        if(res !== undefined){
            ipcRenderer.send('request-file-paths', res);  
            ipcRenderer.on('file-paths', (event, filePaths) => {
                console.log(filePaths);
            });
        } else {
            return
        }
    })
}
</script>

<style scoped>
.ncd-homepage{
    height: 100%;
}
.buttons-project {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.buttons-project > *,
.buttons-project .el-button{
    width: 100%;
    margin-bottom: 6px;
}
</style>