import FirefoxClient from '@cliqz-oss/firefox-client'
import { exec } from 'child_process'
import extract from 'extract-zip'
import { http, https } from 'follow-redirects'
import fs from 'fs'
import { mkdtemp, readdir, rm } from 'fs/promises'
import os from 'os'
import path from 'path'
import promisify from 'util.promisify'
import { AppsActor, DeviceActor, DeviceApp, DeviceInfo } from './models'
import { getManifestUrl, logger } from './utils'
import { get_keys } from '../../renderer/src/apis/electron-store'

export class Device {
    private _client: FirefoxClient
    private _deviceActor: DeviceActor | undefined
    private _appsActor: AppsActor | undefined

    constructor() {
        this._client = new FirefoxClient()
    }

    //手机截图
    public async getPicFromPhoneScreen() {
        let actor = JSON.parse(JSON.stringify(this._deviceActor))['actor']
        let screenData = await this.request('screenshotToDataURL', { to: actor }, actor)
        let value = JSON.parse(JSON.stringify(screenData))['value']
        let length = parseInt(value['length'])
        actor = value['actor']
        const screenString = await this.request('substring', { start: 0, end: length }, actor)
        let image = JSON.parse(JSON.stringify(screenString))['substring']
        console.log('image' + image)
        return image
    }

    public async runadbcommand() {
        const cwd = await get_keys("adb_path")
        const adbcommand = 'adb forward tcp:6000 localfilesystem:/data/local/debugger-socket'

        try {
            exec(adbcommand, {cwd, encoding: 'utf8'}, (error, data) => {
                    console.log('data:' + data)
                }
            )
        } catch (err) {
            console.log('error:' + err)
        }
    }

    public connect(port = 6000) {
        this.runadbcommand()
        return new Promise((resolve, reject) => {
            this._client.connect(port, 'localhost', async (err: any) => {
                if (err) {
                    logger.error('Unable to connect to device')
                    return reject(err)
                }

                this._deviceActor = await this.getDeviceActor()
                this._appsActor = await this.getWebappsActor()

                resolve(null)
            })
            this._client.on('error', (err: any) => {
                logger.error('Unable to connect to device')
                reject(err)
            })
            this._client.on('timeout', (err: any) => {
                logger.error('Unable to connect to device')
                reject(err)
            })
        })
    }

    public disconnect() {
        this._client.disconnect()
    }

    private getDeviceActor(): Promise<DeviceActor> {
        return new Promise((resolve) => {
            this._client.getDevice((err: any, result: DeviceActor) => {
                resolve(result)
            })
        })
    }

    private getWebappsActor(): Promise<AppsActor> {
        return new Promise((resolve, reject) => {
            this._client.getWebapps((err: any, result: AppsActor) => {
                resolve(result)
            })
        })
    }

    private request(type: String, message: any, to: String): Promise<any> {
        return new Promise((resolve, reject) => {
            this._client.request(
                type,
                message,
                '',
                (err: any, result: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                },
                to
            )
        })
    }

    public async getApp(appId: string): Promise<DeviceApp | undefined> {
        const apps = await this.getInstalledApps()
        const app = apps.find((a) => a.id === appId)

        if (!app) throw new Error(`Unable to find app for id ${appId}`)

        return app
    }

    public async launchApp(appId: string): Promise<void> {
        const manifestUrl = getManifestUrl(appId)
        const launchApp = promisify(this._appsActor!.launch.bind(this._appsActor))

        await launchApp(manifestUrl).catch((err: any) => logger.error(err))
    }

    public async closeApp(appId: string): Promise<void> {
        const manifestUrl = getManifestUrl(appId)
        const closeApp = promisify(this._appsActor!.close.bind(this._appsActor))

        await closeApp(manifestUrl)
    }

    public async getInstalledApps(): Promise<DeviceApp[]> {
        const getInstalledApps = promisify<DeviceApp[]>(
            this._appsActor!.getInstalledApps.bind(this._appsActor)
        )

        const apps = await getInstalledApps().then((res) => res.filter((a) => !!a.manifest))

        return apps
    }

    public async getRunningApps(): Promise<DeviceApp[]> {
        const getRunningApps = promisify<string[]>(
            this._appsActor!.listRunningApps.bind(this._appsActor)
        )

        const manifestUrls = await getRunningApps()
        const allApps = await this.getInstalledApps()
        const runningApps = allApps.filter((a) => manifestUrls.includes(a.manifestURL))

        return runningApps
    }

    public async installPackagedApp(path: string, appId: string): Promise<DeviceApp> {
        const installPackagedApp = promisify<string, string, string>(
            this._appsActor!.installPackaged.bind(this._appsActor)
        )

        const installedAppId = await installPackagedApp(path, appId)
        const installedApp = (await this.getApp(installedAppId)) as DeviceApp

        return installedApp
    }

    public async installPackagedAppFromUrl(url: string, appId: string): Promise<DeviceApp> {
        const basePath = await mkdtemp(path.join(os.tmpdir(), 'Nine-colored-deer-'))
        console.log('BASE PATH', basePath)

        const fileId = new Date().valueOf()
        const downloadedZipPath = `${basePath}/${fileId}.zip`

        await download(url, downloadedZipPath)
        await extract(downloadedZipPath, { dir: `${basePath}/${fileId}` })
        const files = await readdir(`${basePath}/${fileId}`)
        console.log('files:', files)
        const zipFileName = files.find((file) => file.endsWith('.zip'))

        if (!zipFileName && !files.includes('manifest.webapp')) {
            throw new Error('Invalid zip file')
        }

        const zipFilePath = files.includes('manifest.webapp')
            ? downloadedZipPath
            : `${basePath}/${fileId}/${zipFileName}`
        console.log('Install zip', zipFilePath)

        const installedApp = await this.installPackagedApp(zipFilePath, appId)

        await rm(basePath, { force: true, recursive: true })

        return installedApp
    }

    public async uninstallApp(appId: string): Promise<DeviceApp> {
        const manifestUrl = getManifestUrl(appId)
        const uninstallApp = promisify<string, DeviceApp>(
            this._appsActor!.uninstall.bind(this._appsActor)
        )

        const uninstalledApp = await uninstallApp(manifestUrl)

        return uninstalledApp
    }

    public async getDeviceInfo(): Promise<DeviceInfo> {
        const getDeviceInfo = promisify<DeviceInfo>(
            this._deviceActor!.getDescription.bind(this._deviceActor)
        )

        const device = await getDeviceInfo()
        device.name = device.useragent?.match(/Mobile; (.*);/)?.[1] || 'Generic Device'
        // device.screenshot = await this.getPicFromPhoneScreen()
        //console.log("  device.screenshot "+  device.screenshot);
        return device
    }
}

function download(url: string, filePath: string) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath)
        https.get(url, (res) => {
                res.pipe(file)
                file.on('finish', () => file.close(resolve))
            })
            .on('error', (err) => fs.unlink(filePath, () => reject(err)))
    })
}

export async function useDevice(fn: (device: Device) => void) {
    const device = new Device()
    await device.connect()
    const result = await fn(device)
    device.disconnect()
    return result
}
