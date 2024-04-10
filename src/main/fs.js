import { ipcMain, ipcRenderer } from 'electron'
import * as fs from 'fs'
// import * as path from 'path'

// Electron main process
function fs_init_ready() {
    ipcMain.handle('fs-readfilesync', (_, file) => fs.readFileSync(file))
    ipcMain.on('fs-writefilesync', (_, file, data) => fs.writeFileSync(file, data))
    ipcMain.on('request-file-paths', (event) => {
        const dir_path = event.args[0]
        const files_path = get_all_filepaths(dir_path)
        event.returnValue = files_path
    })
}

const fs_init_preload = {
    readFileSync: (file) => ipcRenderer.invoke('fs-readfilesync', file),
    writeFileSync: (file, data) => ipcRenderer.invoke('fs-writefilesync', file, data)
}

export { fs_init_ready, fs_init_preload }
