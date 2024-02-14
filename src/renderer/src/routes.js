import Home from './pages/Home.vue'
import Dev from './pages/Dev.vue'

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
    }
]
