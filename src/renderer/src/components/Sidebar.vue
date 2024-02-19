<template>
    <el-menu id="sidebar" default-active="1" class="ncd-menu-vertical" :collapse="true" router>
        <el-menu-item-group>
            <el-menu-item index="1">
                <el-icon><i-ep-home-filled /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar_home') }}</template>
            </el-menu-item>
            <el-menu-item index="/dev">
                <el-icon><i-ep-top-right /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar_dev') }}</template>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon><i-ep-circle-check-filled /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar_debugger') }}</template>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon><i-ep-tools /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar_tools') }}</template>
            </el-menu-item>
            <el-menu-item index="5">
                <el-icon><i-ep-shopping-bag /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar_store') }}</template>
            </el-menu-item>
            <el-menu-item index="6">
                <el-icon><i-ep-setting /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar_settings') }}</template>
            </el-menu-item>
        </el-menu-item-group>
    </el-menu>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped>
.ncd-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
}
</style>
