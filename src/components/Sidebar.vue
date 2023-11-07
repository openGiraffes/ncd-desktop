<template>
    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <template #title>{{ $t('ncd_ui.sidebar_home') }}</template>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon>
                <document />
            </el-icon>
            <template #title>{{ $t('ncd_ui.sidebar_dev') }}</template>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>{{ $t('ncd_ui.sidebar_debugger') }}</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>{{ $t('ncd_ui.sidebar_tools') }}</template>
        </el-menu-item>
        <el-menu-item index="5">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>{{ $t('ncd_ui.sidebar_store') }}</template>
        </el-menu-item>
        <el-menu-item index="6">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>{{ $t('ncd_ui.sidebar_settings') }}</template>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped>
#sidebar {
    width: 60px;
    height: 100%;
    background-color: #F4F4F4;
}
</style>