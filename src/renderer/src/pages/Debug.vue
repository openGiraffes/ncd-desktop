<template>
    <div class="ncd-debug">
        <div class="ncd-kaiscr-controller">
            <el-button primary @click="open_kailive()">启动KaiLive</el-button>
            <div style="overflow: auto; border: 2px solid black; height: 200px;">
                <p class="process-output" 
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
import child_process from 'child_process'
import * as stores from '../apis/electron-store'
let process_output = reactive({
    kailive_stdout: "",
    kailive_stdout_array: []
})
let kailive_command
async function open_kailive() {
    let python_path = await stores.get_keys('python_path') + "\\python.exe"
    let kailive_path = await stores.get_keys('kailive_path') + "\\kailive-tk-speed.py"
    kailive_command = child_process.spawn(python_path, [kailive_path])
    process_output.kailive_stdout_array = output_kailive()
}

function output_kailive() {
    let arr = []
    kailive_command.stdout.on("data", function (data) {
        let output = data.toString()
        arr.push(output)
    })
    kailive_command.stderr.on("data", function (data) {
        arr.push(data.toString())
    })
    kailive_command.on("close", function (code) {
        arr.push(code.toString())
    })
    return arr
}
</script>

<style scoped>
.process-output {
    margin: 0
}
</style>