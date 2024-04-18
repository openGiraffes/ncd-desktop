export default {
    ncd_ui: {
        sidebar: {
            home: '主页',
            dev: '开发',
            debugger: '调试',
            tools: '工具',
            store: 'KaiOS 商店',
            settings: '设置',
            account: '账户',
        },
        home: {
            create_project: '新建项目',
            open_project: '打开已有项目',
            recent_project: '最近项目',
            recent_project_desc: '最近打开的项目会在这里展示',
        },
        tools: {
            packagezip: {
                title: '打包 ZIP 程序包',
                radio: '打包类型',
                project_path: '项目目录',
                save_path: '保存位置',
                opensave: '打包完成后打开保存的位置',
                submit: '打包',
            },
            installzip: {
                title: '安装本地 ZIP 程序包',
                radio: '包类型',
                path: '包路径',
                submit: '安装',
            }
        },
        settings: {
            general: {
                title: '通用',
                locale: '语言',
                kaistores: '商店来源'
            },
            env: {
                title: '环境',
                adb_path: 'ADB 目录',
                python_path: 'Python 目录',
                gdeploy_path: 'gdeploy 工具路径',
                kailive_path: 'KaiLive 工具目录',
                firefox_xul_path: 'Firefox XUL 路径',
                firefox_quantum_path: 'Firefox Quantum 路径',
            },
            personal: {
                title: '个性化',
                download_path: '下载路径',
            },
            dev: {
                title: '开发',
                goto_debug: '跳转到调试页面',
                project_path: '项目目录'
            }
        }
    },
    ncd_ui_tips: {
        settings_firefox_xul_path: '即使用旧内核且支持 XPCOM 和 XUL 的 Firefox, 例如 Waterfox Classic',
        settings_firefox_quantum_path: '即量子火狐，使用新内核的 Firefox',
        settings_goto_debug: '运行后跳转到调试页面',
        settings_project_path: '新项目将默认创建到该目录下'
    },
    ncd_general: {
        back: '返回',
        select_path: '选择目录'
    }
}
