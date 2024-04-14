<template>
    <div class="ncd-account-page">
        <el-container>
            <el-aside>
                <img class="ncd-account-avatar" :src="NcdAvatar" alt="avatar" />
                <div class="buttons-account">
                    <div v-if="isLogin">
                        <p class="account-username"></p>
                        <div class="button-sync">
                            <el-button type="primary">同步设置</el-button>
                        </div>
                        <div class="button-logout"><el-button>登出</el-button></div>
                    </div>
                    <div v-else>
                        <p class="account-username">未登录</p>
                        <div class="button-login"><el-button type="primary">登录</el-button></div>
                        <div class="button-reg"><el-button>注册</el-button></div>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <el-descriptions v-if="isLogin" :column="1" :size="size" border>
                    <el-descriptions-item label="用户ID"></el-descriptions-item>
                    <el-descriptions-item label="用户名"></el-descriptions-item>
                    <el-descriptions-item label="邮箱"></el-descriptions-item>
                    <el-descriptions-item label="最后登录时间"></el-descriptions-item>
                    <el-descriptions-item label="用户等级"></el-descriptions-item>
                </el-descriptions>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import default_avatar from '../assets/default_avatar.png'
import axios from 'axios'
export default {
    name: 'AccountPage',
    data(){}
}
</script>

<script setup>
const NcdAvatar = default_avatar
const isLogin = false
</script>

<style scoped>
.ncd-account-page {
    height: 100%;
}
.el-container {
    height: 100%;
}
.ncd-account-avatar {
    width: 256px;
    height: 256px;
    border-radius: 100%;
}
.buttons-account {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.buttons-account > *,
.buttons-account .el-button {
    width: 100%;
    margin-bottom: 6px;
}
</style>
