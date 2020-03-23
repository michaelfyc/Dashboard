<template>
    <el-button type="warning" @click.prevent="handleLogout" :v-loading="loading">登出</el-button>
</template>

<script>
    export default {
        name: "Logout",
        data() {
            return {
                loading: false
            }
        },
        methods: {
            handleLogout() {
                this.$confirm("确认登出？", "提示", {
                    confirmButtonText: "登出",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        //TODO 这里加timeout自动关闭msgbox
                        this.$store.commit("logout");
                        this.$alert("正在登出中，请稍等...", {
                            showConfirmButton: false,
                        });
                    })
                    .catch(() => {
                        this.$message.info("已取消登出");
                    })
            }
        }
    }
</script>

<style scoped>

</style>