<template>
    <el-menu
        id="sidebar"
        default-active="/tools"
        class="ncd-menu-vertical"
        :collapse="false"
        router
    >
        <el-menu-item-group>
            <el-menu-item index="/tools/packageZip">
                <el-icon><i-ep-files /></el-icon>
                <template #title>{{ $t('ncd_ui.tools.packagezip.title') }}</template>
            </el-menu-item>
            <el-menu-item index="/tools/installZip">
                <el-icon><i-ep-files /></el-icon>
                <template #title>{{ $t('ncd_ui.tools.installzip.title') }}</template>
            </el-menu-item>
        </el-menu-item-group>
    </el-menu>
</template>

<script>
export default {
    name: 'SidebarTools'
}
</script>

<style scoped>
.ncd-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: 100%;
}
</style>
