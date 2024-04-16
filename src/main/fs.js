import { ipcMain, ipcRenderer } from 'electron'
import * as fs from 'fs'
// import * as path from 'path'

// Electron main process
function fs_init_ready() {
    ipcMain.handle('fs-readfilesync', (_, file) => fs.readFileSync(file))
    ipcMain.on('fs-writefilesync', (_, file, data) => fs.writeFileSync(file, data))
    ipcMain.on('fs-mkdirsync', (_, folder) => fs.writeFileSync(folder))
    ipcMain.on('fs-renamesync', (_, oldF, newF) => fs.renameSync(oldF, newF))
    ipcMain.on('fs-rmsync', (_, file) => fs.rmSync(file))
    ipcMain.on('fs-rmdirsync', (_, folder) => fs.rmdirSync(folder))
    ipcMain.on('fs-cpsync', (_, src, dest) => fs.cpSync(src, dest, {recursive: true}))
    ipcMain.on('request-file-paths', (event) => {
        const dir_path = event.args[0]
        const files_path = get_all_filepaths(dir_path)
        event.returnValue = files_path
    })
}

const fs_init_preload = {
    readFileSync: (file) => ipcRenderer.invoke('fs-readfilesync', file),
    writeFileSync: (file, data) => ipcRenderer.invoke('fs-writefilesync', file, data),
    mkdirSync: (folder) => ipcRenderer.invoke('fs-mkdirsync', folder),
    renameSync: (oldF, newF) => ipcRenderer.invoke('fs-mkdirsync', oldF, newF),
    rmSync: (file) => ipcRenderer.invoke('fs-rmsync', file),
    rmdirSync: (folder) => ipcRenderer.invoke('fs-rmdirsync', folder),
    cpSync: (src, dest) => ipcRenderer.invoke('fs-cpsync', src, dest)
}

export { fs_init_ready, fs_init_preload }
