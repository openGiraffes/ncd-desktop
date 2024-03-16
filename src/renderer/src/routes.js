import Home from './pages/Home.vue'
import Dev from './pages/Dev.vue'

// Tool pages
import Tools from './pages/Tools.vue'
import PackageZip from './pages/ToolsPages/PackageZip.vue'

export default [
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
    }
]
