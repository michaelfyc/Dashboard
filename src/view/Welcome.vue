<template>
    <el-card class="welcomeCard">
        <router-view></router-view>
    </el-card>
</template>

<script>

    export default {
        name: "Welcome"
    }
</script>

<style scoped>
    .welcomeCard {
        width: 500px;
        margin-top: 100px;
        margin-left: auto;
        margin-right: auto;
    }
</style>