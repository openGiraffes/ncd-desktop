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

export { readFileSync, writeFileSync }
