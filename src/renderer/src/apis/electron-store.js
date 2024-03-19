import { ipcRenderer } from 'electron'
let res = ''

const check_keys = (key) => {
    ipcRenderer.invoke('electron-store-has', key).then((result)  => { res = result })
    return res
}

async function get_keys(key) {
    res = await ipcRenderer.invoke('electron-store-get', key)
    // console.log(res)
    return res
}

const set_keys = (key, value) => {
    ipcRenderer.send('electron-store-set', key, value)
}

export { check_keys, get_keys, set_keys }