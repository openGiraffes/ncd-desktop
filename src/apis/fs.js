import { ipcMain, ipcRenderer } from 'electron'
import * as fs from 'fs'


function fs_init_main() {
    ipcMain.handle('fs-readfilesync', (_, file) => fs.readFileSync(file))
    ipcMain.on('fs-writefilesync', (_, file, data) => fs.writeFileSync(file, data))
}

const fs_init_preload = {
    readFileSync: (file) => ipcRenderer.invoke('fs-readfilesync', file),
    writeFileSync: (file, data) => ipcRenderer.invoke('fs-writefilesync', file, data)
}

export { fs_init_main, fs_init_preload }