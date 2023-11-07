<template>
    <el-menu id="sidebar"
        default-active="1"
        class="ncd-menu-vertical"
        :collapse="ncd_is_collapse"
        router
    >
        <el-menu-item-group>
            <el-menu-item index="1">
            <template #title>{{ $t('ncd_ui.sidebar_home') }}</template>
        </el-menu-item>
        <el-menu-item index="/dev">
            <template #title>{{ $t('ncd_ui.sidebar_dev') }}</template>
        </el-menu-item>
        <el-menu-item index="3">
            <template #title>{{ $t('ncd_ui.sidebar_debugger') }}</template>
        </el-menu-item>
        <el-menu-item index="4">
            <template #title>{{ $t('ncd_ui.sidebar_tools') }}</template>
        </el-menu-item>
        <el-menu-item index="5">
            <template #title>{{ $t('ncd_ui.sidebar_store') }}</template>
        </el-menu-item>
        <el-menu-item index="6">
            <template #title>{{ $t('ncd_ui.sidebar_settings') }}</template>
        </el-menu-item>
        </el-menu-item-group>
    </el-menu>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'Sidebar'
}
const ncd_is_collapse = ref(false)
</script>

<style scoped>
.ncd-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>