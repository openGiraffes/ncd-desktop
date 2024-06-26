import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { electron_store_init_preload } from '../main/electron-store'
import { fs_init_preload } from '../main/fs'
import { firefox_client_init_preload, firefox_client_init_preload_browser } from '../main/firefox-client'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('browser', firefox_client_init_preload_browser)
        contextBridge.exposeInMainWorld('kaidevice', firefox_client_init_preload)
        contextBridge.exposeInMainWorld('store', electron_store_init_preload)
        contextBridge.exposeInMainWorld('fs', fs_init_preload)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.kaidevice = firefox_client_init_preload
    window.browser = firefox_client_init_preload_browser
    window.api = api
}
