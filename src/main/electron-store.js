import { ipcMain, ipcRenderer } from 'electron'
import Store from 'electron-store'
const store = new Store()

function electron_store_init_main() {
    ipcMain.handle('electron-store-get', (_, key) => store.get(key))
    ipcMain.handle('electron-store-has', (_, key) => store.has(key))
    ipcMain.on('electron-store-set', (_, key, value) => store.set(key, value))
}

const electron_store_init_preload = {
    get: (key) => ipcRenderer.invoke('electron-store-get', key),
    set: (key, value) => ipcRenderer.invoke('electron-store-set', key, value),
    has: (key) => ipcRenderer.invoke('electron-store-has', key)
}

export { electron_store_init_main, electron_store_init_preload }
