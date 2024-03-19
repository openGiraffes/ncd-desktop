<template>
    <div class="ncd-homepage">
        <el-container>
            <el-aside>
                Nine-colored Deer
                <div class="buttons-project">
                    <div class="button-create-project"><el-button type="primary">新建项目</el-button></div>
                    <div class="button-open-project"><el-button>打开已有项目</el-button></div>
                </div>
            </el-aside>
            <el-main>
                <h1>{{ $t('ncd_ui.home_recent_project') }}</h1>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'HomePage'
}
</script>

<style scoped>
.buttons-project {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>