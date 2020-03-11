<template>
    <el-container>
        <el-aside width="200px">
            <el-header></el-header>
            <Sidebar></Sidebar>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import Sidebar from "../components/panel/Sidebar";

    export default {
        name: "Home",
        components: {Sidebar}
    }
</script>

<style scoped>

</style>