import { Device } from "./firefox-client/device"
import { ipcMain, ipcRenderer, BrowserWindow } from "electron"
import { download } from 'electron-dl';
import Store from 'electron-store'
const store = new Store()

function firefox_client_init_main() {
    ipcMain.handle('device-info', async (_) => {
        console.log('device-info')
        const device = new Device()

        await device.connect()
        const info = await device.getDeviceInfo()
        device.disconnect()

        return info
    })

    ipcMain.handle('device-running-apps', async (_) => {
        console.log('device-running-apps')
        const device = new Device()

        await device.connect()
        const apps = await device.getRunningApps()
        device.disconnect()

        return apps
    })

    ipcMain.handle('device-installed-apps', async (_) => {
        console.log('device-installed-apps')
        const device = new Device()

        await device.connect()
        const apps = await device.getInstalledApps()
        device.disconnect()

        return apps
    })

    ipcMain.handle('device-install', async (_, url) => {
        console.log('device-install', url)
        const device = new Device()

        await device.connect()
        await device.installPackagedAppFromUrl(url, `${new Date().valueOf()}`)
        device.disconnect()
    })

    ipcMain.handle('device-install-local', async (_, filePath) => {
        console.log('device-install-local', filePath)
        const device = new Device()

        await device.connect()
        await device.installPackagedApp(filePath, `${new Date().valueOf()}`)
        device.disconnect()
    })

    ipcMain.handle('device-uninstall', async (_, appId) => {
        console.log('device-uninstall', appId)
        const device = new Device()
        await device.connect()
        await device.uninstallApp(appId)
        device.disconnect()
    })

    ipcMain.handle('device-launch-app', async (_, appId) => {
        console.log('device-launch-app', appId)
        const device = new Device()
        await device.connect()
        await device.launchApp(appId)
        device.disconnect()
    })

    ipcMain.handle('device-close-app', async (_, appId) => {
        console.log('device-close-app', appId)
        const device = new Device()
        await device.connect()
        await device.closeApp(appId)
        device.disconnect()
    })

    ipcMain.handle('open-url', async (_, url) => {
        console.log('open-url', url)
        await shell.openExternal(url)
    })

    ipcMain.handle('download-url', async ({ sender }, url) => {
        console.log('download-url', url)
        const win = BrowserWindow.fromWebContents(sender)
        if (!win) {
            throw new Error('BrowserWindow not found')
        }
        // would be better if
        await download(win, url, { directory: await store.get('project_path') })
    })
}

const firefox_client_init_preload = {
    getInfo: () => ipcRenderer.invoke('device-info'),
    getRunningApps: () => ipcRenderer.invoke('device-running-apps'),
    getInstalledApps: () => ipcRenderer.invoke('device-installed-apps'),
    installApp: (url) => ipcRenderer.invoke('device-install', url),
    installLocalApp: (url) => ipcRenderer.invoke('device-install-local', url),
    uninstallApp: (appId) => ipcRenderer.invoke('device-uninstall', appId),
    launchApp: (appId) => ipcRenderer.invoke('device-launch-app', appId),
    closeApp: (appId) => ipcRenderer.invoke('device-close-app', appId)
}

const firefox_client_init_preload_browser = {
    openUrl: (url) => ipcRenderer.invoke('open-url', url),
    downloadUrl: (url) => ipcRenderer.invoke('download-url', url)
}

export { firefox_client_init_main, firefox_client_init_preload, firefox_client_init_preload_browser }
