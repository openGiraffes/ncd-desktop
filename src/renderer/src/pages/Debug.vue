<template>
    <div class="ncd-debug">
        <div class="ncd-kaiscr-controller">
            <el-header>
                <el-button primary @click="open_kailive()">启动 KaiLive</el-button>
                <el-button primary @click="open_webide_xul()"
                    >启动 WebIDE (适用于 KaiOS 2.5.x)</el-button
                >
            </el-header>
            <!-- <div style="overflow: auto; border: 2px solid black; height: 200px">
                <p
                    class="process-output"
                    v-for="(out, index) in process_output.kailive_stdout_array"
                    :key="out[index]"
                >
                    {{ out[index] }}
                </p>
            </div> -->
            <el-main>
                <h2>设备信息 <el-button @click="get_device_info()"><el-icon><i-ep-refresh /></el-icon></el-button></h2>
                <el-descriptions :column="3" :size="size" border>
                    <el-descriptions-item label="手机型号">
                        {{ process_output.kaios_device_info.name }}
                    </el-descriptions-item>
                    <el-descriptions-item label="系统版本">
                        {{ process_output.kaios_device_info.vendor }} {{ process_output.kaios_device_info.version }}
                    </el-descriptions-item>
                    <el-descriptions-item label="软件版本">
                        平台版本：{{ process_output.kaios_device_info.platformversion }} <br />
                        Gecko 版本：{{ process_output.kaios_device_info.geckoversion }}
                    </el-descriptions-item>
                    <el-descriptions-item label="语言">
                        {{ process_output.kaios_device_info.locale }}
                    </el-descriptions-item>
                    <el-descriptions-item label="硬件平台">
                        {{ process_output.kaios_device_info.hardware }}
                    </el-descriptions-item>
                    <el-descriptions-item label="SoC 架构">
                        {{ process_output.kaios_device_info.processor }} | {{ process_output.kaios_device_info.arch }}_{{ process_output.kaios_device_info.compiler }}
                    </el-descriptions-item>
                    <el-descriptions-item label="分辨率">
                        {{ process_output.kaios_device_info.width }} x {{ process_output.kaios_device_info.height }}
                    </el-descriptions-item>
                    <el-descriptions-item label="用户代理">
                        {{ process_output.kaios_device_info.useragent }}
                    </el-descriptions-item>
                </el-descriptions>
            </el-main>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DebugPage'
}
</script>
<script setup>
import { ipcRenderer } from 'electron'
import { onMounted } from 'vue'
import * as stores from '../apis/electron-store'
import { spawn_command } from '../apis/child-process'
import child_process from 'child_process'
import { getDeviceInfo } from '../../../main/firefox-client/services/device'

let process_output = reactive({
    kailive_stdout: '',
    kailive_stdout_array: [],
    kaios_device_info: {}
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
    let firefox_path = await stores.get_keys('firefox_xul_path')
    // Open WebIDE with command: firefox -chrome chrome://webide/content/webide.xul
    // Works fine with Waterfox Classic 2022.11
    child_process.spawn(firefox_path, ['-chrome', 'chrome://webide/content/webide.xul'])
}

async function get_device_info() {
    const info = await getDeviceInfo().catch((err) => {
        console.log("Failed:" + err)
        return null
    })
    process_output.kaios_device_info = info
    console.log(info)
}

onMounted(() => {
    get_device_info()
})
</script>

<style scoped>
.process-output {
    margin: 0;
}
</style>
