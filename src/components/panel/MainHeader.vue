<template>
    <div class="main-header">
        <div class="user-info">
            <el-menu mode="horizontal">
                <el-submenu index="1">
                    <template slot="title">
                        <div class="welcome">
                            <el-avatar size="medium"
                                       :src="avatar"></el-avatar>
                            <span class="name" v-text="username"></span>
                        </div>
                    </template>
                    <el-menu-item index="profile" @click="handleProfile">个人资料</el-menu-item>
                    <el-menu-item index="logout" @click="handleLogout">登出</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import {Loading} from "element-ui"

    export default {
        name: "MainHeader",
        data() {
            return {
                username: this.$store.state.user.username,
                avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"//TODO v3.0登录后去找头像
            }
        },

        methods: {
            handleProfile() {
                this.$router.push("/dashboard/profile");
            },
            handleLogout() {
                this.$confirm("确认登出？", "提示", {
                    confirmButtonText: "登出",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        let loading = Loading.service({
                            fullscreen: true,
                            text: "正在登出",
                            background: "rgba(0,0,0,0.8)",
                            spinner: "el-icon-spinner"
                        });
                        this.$store.dispatch("logout").catch(e => console.error(e));
                        setTimeout(() => {
                            loading.close();
                            this.$router.push("/");
                        }, 3000);
                    })
                    .catch(() => {
                        this.$message.info("已取消登出");
                    })
            }
        }
    }
</script>

<style scoped>
    .main-header {
        background-color: dodgerblue;
        width: 100%;
        height: 60px;
        line-height: 60px;
    }

    .user-info {
        line-height: 60px;
        text-align: right;
    }

    .welcome {
        display: inline-block;
        vertical-align: middle;
        padding: 0 5px;
    }

    .name {
        line-height: 20px;
        text-align: center;
        font-size: 12px;
    }
</style>