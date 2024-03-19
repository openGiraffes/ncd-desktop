import { app, shell, BrowserWindow, ipcMain, ipcRenderer, dialog } from 'electron'
import { join } from 'path'
import Store from 'electron-store'
Store.initRenderer()
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { electron_store_init_main } from '../apis/electron-store'
import { fs_init_main } from '../apis/fs'

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
    ipcMain.handle('dialog:openFile', handleFileOpen)

    electron_store_init_main()
    fs_init_main()
    
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

async function handleFileOpen() {
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
