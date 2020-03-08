<template>
    <el-button type="warning" @click.prevent="handleLogout">登出</el-button>
</template>

<script>
    export default {
        name: "Logout",
        methods: {
            handleLogout() {
                this.$confirm("确认登出？", "提示", {
                    confirmButtonText: "登出",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store.commit("logout");
                        this.$router.push("/");
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