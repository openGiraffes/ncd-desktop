export default {
    ncd_ui: {
        sidebar: {
            home: 'Home',
            dev: 'Develop',
            debugger: 'Debugger',
            tools: 'Tools',
            store: 'KaiOS Store',
            settings: 'Settings',
            account: 'Account',
        },
        home: {
            create_project: 'Create project',
            open_project: 'Open existing project',
            recent_project: 'Recent Project',
            recent_project_desc: 'Recently opened projects are displayed here.',
        },
        tools: {
            packagezip: {
                title: 'Package ZIP',
                radio: 'Package Type',
                project_path: 'Project Path',
                save_path: 'Save Path',
                submit: 'Package',
            }
        },
        settings: {
            general: {
                title: 'General',
                locale: 'Languages',
                kaistores: 'Store source'
            },
            env: {
                title: 'Environment',
                adb_path: 'ADB Path',
                python_path: 'Python Path',
                gdeploy_path: 'gdeploy Path',
                kailive_path: 'KaiLive Path',
                firefox_xul_path: 'Firefox XUL Path',
                firefox_quantum_path: 'Firefox Quantum Path',
            },
            personal: {
                title: 'Personalization',
                download_path: 'Download Path',
            },
            dev: {
                title: 'Develop',
                goto_debug: 'Jump to debug page'
            }
        }
    },
    ncd_ui_tips: {
        settings_firefox_xul_path: 'Firefox with older Gecko version (support XPCOM and XUL), such as Waterfox Classic.',
        settings_firefox_quantum_path: 'Firefox with the new kernel.',
        settings_goto_debug: 'Jump to debug page after project running',
        settings_project_path: 'New projects will be created in this directory by default'
    },
    ncd_general: {
        back: 'Back',
        select_path: 'Select path'
    }
}
