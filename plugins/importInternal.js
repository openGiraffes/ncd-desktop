export let getReplacer = () => {
    let externalModels = [
        'os',
        'fs',
        'path',
        'events',
        'child_process',
        'crypto',
        'http',
        'buffer',
        'url',
        'better-sqlite3',
        'knex'
    ]
    let result = {}
    for (let item of externalModels) {
        result[item] = () => ({
            find: new RegExp(`^${item}$`),
            code: `const ${item} = require('${item}');export { ${item} as default }`
        })
    }
    result['electron'] = () => {
        let electronModules = [
            // 'clipboard',
            'ipcRenderer',
            'ipcMain',
            // 'nativeImage',
            'shell',
            'dialog',
            // 'webFrame',
            'remote'
        ].join(',')
        return {
            find: new RegExp(`^electron$`),
            code: `const {${electronModules}} = require('electron');export {${electronModules}}`
        }
    }
    return result
}
