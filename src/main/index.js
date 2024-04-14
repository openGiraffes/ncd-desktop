import { app, shell, BrowserWindow, ipcMain, ipcRenderer, dialog } from 'electron'
import { join } from 'path'
import Store from 'electron-store'
Store.initRenderer()
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { file_controller_init_main } from './file-controller'
import { electron_store_init_main } from './electron-store'
import { fs_init_ready } from './fs'
import { child_process_init_main } from './child-process'
import { firefox_client_init_main } from './firefox-client'

let mainWindow = null

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    mainWindow.webContents.send('file-paths', 'main')
    mainWindow.on('close', () => {
        mainWindow.webContents.executeJavaScript('localStorage.removeItem("project_files_cache")', true).then((result) => {
            console.log("Clean project_cache successful.")
        })
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

// 关闭GPU加速
app.disableHardwareAcceleration()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    ipcMain.on('ping', () => console.log('pong'))
    
    file_controller_init_main()
    electron_store_init_main()
    fs_init_ready()
    child_process_init_main()
    firefox_client_init_main()

    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
