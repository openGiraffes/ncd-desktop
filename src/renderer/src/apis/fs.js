import { ipcRenderer } from 'electron'
let res = ''

function readFileSync(path) {
    ipcRenderer.invoke('fs-readfilesync', path).then((result) => {
        res = result
    })
    console.log(res)
    return res
}

function writeFileSync(path, content) {
    ipcRenderer.send('fs-writefilesync', path, content)
}

function mkdirSync(path, content) {
    ipcRenderer.send('fs-mkdirsync', path)
}

function renameSync(path, newPath) {
    ipcRenderer.send('fs-renamesync', path, newPath)
}

function rmSync(path) {
    ipcRenderer.send('fs-rmsync', path)
}

function rmdirSync(path) {
    ipcRenderer.send('fs-rmdirsync', path)
}

export { readFileSync, writeFileSync, mkdirSync, renameSync, rmSync, rmdirSync }
