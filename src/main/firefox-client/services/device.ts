import { DeviceApp, DeviceInfo } from '../models';

export function getDeviceInfo(): Promise<DeviceInfo> { 
  // return window.kaidevice.getInfo();
  return window.kaidevice.getInfo();
}

export function getRunningApps(): Promise<DeviceApp[]> {
  return window.kaidevice.getRunningApps();
}

export function getInstalledApps(): Promise<DeviceApp[]> {
  return window.kaidevice.getInstalledApps();
}

export function installApp(url: string): Promise<DeviceApp> {
  return window.kaidevice.installApp(url);
}

export function installLocalApp(filePath: string): Promise<DeviceApp> {
  return window.kaidevice.installLocalApp(filePath);
}

export function uninstallApp(appId: string): Promise<void> {
  return window.kaidevice.uninstallApp(appId);
}

export function launchApp(appId: string): Promise<void> {
  return window.kaidevice.launchApp(appId);
}

export function closeApp(appId: string): Promise<void> {
  return window.kaidevice.closeApp(appId);
}
