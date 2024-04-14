import { type Files } from 'monaco-tree-editor'
import * as fs from '../apis/fs'
import { ipcRenderer } from 'electron'
import { get_all_filepaths } from '../apis/get-all-file-paths'

const fileSeparator = '\\'
// console.log(filePath)
let responseFiles
export const getFiles = async (filePath) => {
    if (filePath) {
        console.log(filePath)
        responseFiles = await get_all_filepaths(filePath)
    } else {
        responseFiles = {
            "main": {
                isFolder: true
            },
            "index.js": {
                isFile: true,
                content: ''
            }
        }
    }
}

// console.log(responseFiles)

export const delay = async (maxMs = 3000) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, Math.random() * maxMs)
    })
}
export const fetchFiles = async () => {
    await delay(1000)
    return await JSON.parse(JSON.stringify(responseFiles))
}
export const createOrSaveFile = async (path: string, content: string) => {
    await delay()
    if (responseFiles[path]) {
        if (!responseFiles[path].isFile) {
            throw new Error(`save file:[ ${path} ] is not a file!`)
        }
        responseFiles[path].content = content
        await fs.writeFileSync(path, content) // 写入文件
    } else {
        responseFiles[path] = {
            isFile: true,
            content
        }
        console.log(path)
    }
}
export const newFile = async (path: string) => {
    await delay()
    if (responseFiles[path]) {
        throw new Error(`new file: [ ${path} ] already exists!`)
    }
    responseFiles[path] = {
        isFile: true,
        content: ''
    }
    await fs.writeFileSync(path, '')
}
export const newFolder = async (path: string) => {
    await delay()
    if (responseFiles[path]) {
        throw new Error(`new folder: [ ${path} ] already exists!`)
    }
    responseFiles[path] = {
        isFolder: true
    }
    await fs.mkdirSync(path)
}
export const rename = async (path: string, newPath: string) => {
    await delay()
    if (!responseFiles[path]) {
        throw new Error(`rename: source file/folder name [ ${path} ] not exists!`)
    } else if (responseFiles[newPath]) {
        throw new Error(`rename: target file/folder name [ ${newPath} ] already exists!`)
    }
    responseFiles[newPath] = responseFiles[path]
    await fs.renameSync(path, newPath)
    if (path !== newPath) {
        delete responseFiles[path]
    }
    return true
}
export const deleteFile = async (path: string) => {
    await delay()
    if (!responseFiles[path]) {
        throw new Error(`delete: file name [ ${path} ] not exists!`)
    }
    await fs.rmSync(path)
    delete responseFiles[path]
    return true
}
