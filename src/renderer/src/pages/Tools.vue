<template>
    <el-container style="height: 100%">
        <SidebarTools></SidebarTools>
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
import SidebarTools from '../components/SidebarTools.vue'

export default {
    name: 'ToolsPage',
    components: {
        SidebarTools
    }
}
</script>
