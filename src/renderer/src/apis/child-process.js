import { ipcRenderer } from 'electron'

function spawn_command(cmd) {
    ipcRenderer.send('spawn-command', cmd)
}

export { spawn_command }
