<template>
    <div class="ncd-homepage">
        <el-container>
            <el-aside>
                <img src="../assets/logo.png" alt="" srcset="">
                <h1>Nine-colored Deer</h1>
                <div class="buttons-project">
                    <div class="button-create-project"><el-button type="primary">新建项目</el-button></div>
                    <div class="button-open-project"><el-button>打开已有项目</el-button></div>
                </div>
            </el-aside>
            <el-main>
                <h1>{{ $t('ncd_ui.home_recent_project') }}</h1>
                <p>最近打开的项目会在这里展示</p>
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
.ncd-homepage{
    height: 100%;
}
.buttons-project {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.buttons-project > *,
.buttons-project .el-button{
    width: 100%;
    margin-bottom: 6px;
}
</style>