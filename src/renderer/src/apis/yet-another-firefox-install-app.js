function install_app_yet_another(webAppsActor, packagedAppPath, appId) {
    return new Promise(function (resolve, reject) {
        webAppsActor.installPackaged(packagedAppPath, appId, function (err, actualAppId) {
            if (err) {
                return reject(err)
            }
            resolve(actualAppId)
        })
    })
}
export { install_app_yet_another }