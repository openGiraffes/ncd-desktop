<template>
    <el-container>
        <Sidebar></Sidebar>
        <el-main>
            <router-view v-slot="{ Component, route }">
                <keep-alive>
                    <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
                </keep-alive>
            </router-view>
        </el-main>
    </el-container>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
    name: 'App',
    components: {
        Sidebar
    }
}
</script>

<style>
#app {
    height: 790px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
