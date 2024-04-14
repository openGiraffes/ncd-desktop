import { ipcMain } from 'electron'
import child_process from 'child_process'

function child_process_init_main() {
    ipcMain.on('spawn-command', (event, command) => {
        child_process.spawn(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`执行错误: ${error}`)
                return event.reply('command-result', { error: error.toString() })
            }
            event.reply('command-result', { stdout, stderr })
        })
    })
}

export { child_process_init_main }
