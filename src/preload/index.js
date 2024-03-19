import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('electron', {
            kaiDevice: {
                getInfo: () => ipcRenderer.invoke('device-info'),
                getRunningApps: () => ipcRenderer.invoke('device-running-apps'),
                getInstalledApps: () => ipcRenderer.invoke('device-installed-apps'),
                installApp: (url) => ipcRenderer.invoke('device-install', url),
                installLocalApp: (url) => ipcRenderer.invoke('device-install-local', url),
                uninstallApp: (appId) => ipcRenderer.invoke('device-uninstall', appId),
                launchApp: (appId) => ipcRenderer.invoke('device-launch-app', appId),
                closeApp: (appId) => ipcRenderer.invoke('device-close-app', appId),
            },
            browser: {
                openUrl: (url) => ipcRenderer.invoke('open-url', url),
                downloadUrl: (url) => ipcRenderer.invoke('download-url', url),
            }
        })
        contextBridge.exposeInMainWorld('store', {
            get: (key) => ipcRenderer.invoke('electron-store-get', key),
            set: (key, value) => ipcRenderer.invoke('electron-store-set', key, value),
            has: (key) => ipcRenderer.invoke('electron-store-has', key),
        })
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.api = api
}
