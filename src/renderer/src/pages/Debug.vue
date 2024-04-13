<template>
    <div class="ncd-debug">
        <div class="ncd-kaiscr-controller">
            <el-header>
                <el-button primary @click="open_kailive()">启动 KaiLive</el-button>
                <el-button primary @click="open_webide_xul()">启动 WebIDE (适用于 KaiOS 2.5.x)</el-button>
            </el-header>
            <div style="overflow: auto; border: 2px solid black; height: 200px">
                <p
                    class="process-output"
                    v-for="(out, index) in process_output.kailive_stdout_array"
                    :key="out[index]"
                >
                    {{ out[index] }}
                </p>
            </div>
        </div>
        <div class="ncd-device-info"></div>
    </div>
</template>
<script>
export default {
    name: 'DebugPage'
}
</script>
<script setup>
import { ipcRenderer } from 'electron'
import * as stores from '../apis/electron-store'
import { spawn_command } from '../apis/child-process'
import child_process from 'child_process'
let process_output = reactive({
    kailive_stdout: '',
    kailive_stdout_array: []
})
async function open_kailive() {
    let python_path = (await stores.get_keys('python_path')) + '\\python.exe'
    let kailive_path = (await stores.get_keys('kailive_path')) + '\\kailive-tk-speed.py'
    spawn_command(python_path, [kailive_path])
    ipcRenderer.on('command-result', (event, result) => {
        if (result.error) {
            console.error(result.error)
        } else {
            process_output.kailive_stdout = result.stdout
        }
    })
}
async function open_webide_xul() {
    let firefox_path = (await stores.get_keys('firefox_xul_path'))
    // Open WebIDE with command: firefox -chrome chrome://webide/content/webide.xul
    // Works fine with Waterfox Classic 2022.11
    child_process.spawn(firefox_path, ["-chrome", "chrome://webide/content/webide.xul"])
}
</script>

<style scoped>
.process-output {
    margin: 0;
}
</style>
