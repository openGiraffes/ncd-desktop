import { ipcMain, dialog } from 'electron'
import path from 'path'

function file_controller_init_main() {
    ipcMain.handle('dialog:openFile', handleFileOpen)
    ipcMain.handle('dialog:openFolder', handleFolderOpen)
    ipcMain.handle('dialog:openProject', handleProjectOpen)
}

async function handleFileOpen() {
    const options = {
        title: 'Select program',
        properties: ['openFile']
    }
    const { canceled, filePaths } = await dialog.showOpenDialog(options)
    if (canceled) {
        console.log(1)
        return
    } else {
        console.log(2, filePaths)
        return filePaths[0]
    }
}

async function handleFolderOpen() {
    const options = {
        title: 'Select a Folder',
        properties: ['openDirectory']
    }
    const { canceled, filePaths } = await dialog.showOpenDialog(options)
    if (canceled) {
        console.log(1)
        return
    } else {
        console.log(2, filePaths)
        return filePaths[0]
    }
}

async function handleProjectOpen() {
    const options = {
        title: 'Select ncd.project file',
        properties: ['openFile'],
        filters: [
            { name: "NCD Project File", extensions: ['ncdproject']},
            { name: "OmniSD metadata.json", extensions: ['json']}
        ]
    }
    const { canceled, filePaths } = await dialog.showOpenDialog(options)
    if (canceled) {
        console.log(1)
        return
    } else {
        console.log(2, filePaths)
        return path.posix.dirname(filePaths[0])
    }
}

export { file_controller_init_main }