export function openUrl(url: string): Promise<void> {
  return window.browser.openUrl(url);
}
export function downloadUrl(url: string): Promise<void> {
  return window.browser.downloadUrl(url);
}
