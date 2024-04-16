<template>
    <el-menu id="sidebar" default-active="/" class="ncd-menu-vertical" :collapse="true" router>
        <el-menu-item-group>
            <el-menu-item index="/account">
                <el-icon
                    ><img class="ncd-account-avatar-sidebar" :src="NcdAvatar" alt="avatar"
                /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar.account') }}</template>
            </el-menu-item>
            <el-menu-item index="/">
                <el-icon><i-ep-home-filled /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar.home') }}</template>
            </el-menu-item>
            <el-menu-item index="/dev">
                <el-icon><i-ep-top-right /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar.dev') }}</template>
            </el-menu-item>
            <el-menu-item index="/debugger">
                <el-icon><i-ep-circle-check-filled /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar.debugger') }}</template>
            </el-menu-item>
            <el-menu-item index="/tools">
                <el-icon><i-ep-tools /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar.tools') }}</template>
            </el-menu-item>
            <el-menu-item index="/store">
                <el-icon><i-ep-shopping-bag /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar.store') }}</template>
            </el-menu-item>
            <el-menu-item index="/settings">
                <el-icon><i-ep-setting /></el-icon>
                <template #title>{{ $t('ncd_ui.sidebar.settings') }}</template>
            </el-menu-item>
        </el-menu-item-group>
    </el-menu>
</template>

<script>
import default_avatar from '../assets/default_avatar.png'
export default {
    name: 'Sidebar'
}
</script>

<script setup>
const NcdAvatar = default_avatar
</script>

<style scoped>
.ncd-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
}
.ncd-account-avatar-sidebar {
    width: 32px;
    height: 32px;
    border-radius: 100%;
}
</style>
