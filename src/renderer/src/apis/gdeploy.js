import child_process from 'child_process'
import { ElMessage } from 'element-plus'

function install(gdeploy_path, project_current, callback) {
    child_process.exec(`${gdeploy_path} install ${project_current}`, {encoding: 'utf8'}, 
        (error, stdout, stderr) => {
            console.log("code: " + error)
            console.log("stdout: " + stdout)
            console.log("stderr: " + stderr)
            ElMessage({
                message: '部署成功',
                type: 'success'
            })
            localStorage.setItem('project_appid', (stdout.split(" "))[1])
            callback()
        }
    )
}

function uninstall(gdeploy_path, project_appid, callback) {
    child_process.exec(`${gdeploy_path} uninstall ${project_appid}`, {encoding: 'utf8'}, 
        (error, stdout, stderr) => {
            console.log("code: " + error)
            console.log("stdout: " + stdout)
            console.log("stderr: " + stderr)
            localStorage.removeItem('project_appid')
            callback()
        }
    )
}

function start(gdeploy_path, project_appid) {
    child_process.exec(`${gdeploy_path} start ${project_appid}`, {encoding: 'utf8'}, 
        (error, stdout, stderr) => {
            console.log("code: " + error)
            console.log("stdout: " + stdout)
            console.log("stderr: " + stderr)
            ElMessage({
                message: '部署成功',
                type: 'success'
            })
        }
    )
}

function stop(gdeploy_path, project_appid) {
    child_process.exec(`${gdeploy_path} stop ${project_appid}`, {encoding: 'utf8'}, 
        (error, stdout, stderr) => {
            console.log("code: " + error)
            console.log("stdout: " + stdout)
            console.log("stderr: " + stderr)
            ElMessage({
                message: '部署成功',
                type: 'success'
            })
        }
    )
}

export {
    install,
    uninstall,
    start,
    stop
}