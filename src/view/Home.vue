<template>
    <el-container>
        <el-aside width="200px" style="background-color: #eef1f6">
            <el-header style="width: 200px; background-color: dodgerblue">
                <SideBarHeader></SideBarHeader>
            </el-header>
            <Sidebar></Sidebar>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import Sidebar from "../components/panel/Sidebar";
    import SideBarHeader from "../components/panel/SideBarHeader";

    export default {
        name: "Home",
        components: {SideBarHeader, Sidebar}
    }
</script>

<style scoped>
    .el-aside {
        min-height: 100vh;
    }
</style>