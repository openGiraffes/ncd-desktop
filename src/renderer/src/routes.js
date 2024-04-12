import Home from './pages/Home.vue'
import Dev from './pages/Dev.vue'
import Debug from './pages/Debug.vue'
import KaiStore from './pages/KaiStore.vue'
import Settings from './pages/Settings.vue'
import Account from './pages/Account.vue'

// Tool pages
import Tools from './pages/Tools.vue'
import PackageZip from './pages/ToolsPages/PackageZip.vue'

export default [
    {
        path: '/account',
        name: 'AccountPage',
        component: Account,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/',
        name: 'HomePage',
        component: Home,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/dev',
        name: 'DevPage',
        component: Dev,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/debugger',
        name: 'DebugPage',
        component: Debug,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/tools',
        name: 'ToolsPage',
        component: Tools,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/tools/packageZip',
        name: 'PackageZip',
        component: PackageZip,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/store',
        name: 'KaiStorePage',
        component: KaiStore,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/settings',
        name: 'SettingsPage',
        component: Settings,
        meta: {
            keepAlive: true
        }
    }
]
