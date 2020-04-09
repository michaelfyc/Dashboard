<template>
    <el-container>
        <el-aside style="width:200px;background-color: #eef1f6">
            <el-header style="width:200px; background-color: dodgerblue">
                <SideBarHeader></SideBarHeader>
            </el-header>
            <Sidebar></Sidebar>
        </el-aside>
        <el-container direction="vertical">
            <el-header>
                <MainHeader/>
            </el-header>
            <el-main style="width:100%">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </el-main>
            <el-footer>
                <MainFooter/>
            </el-footer>
            <el-backtop><i class="el-icon-top"></i></el-backtop>
        </el-container>
    </el-container>
</template>

<script>
    import Sidebar from "../components/panel/Sidebar";
    import SideBarHeader from "../components/panel/SideBarHeader";
    import MainFooter from "../components/panel/MainFooter";
    import MainHeader from "../components/panel/MainHeader";

    export default {
        name: "Home",
        components: {MainHeader, MainFooter, SideBarHeader, Sidebar}
    }
</script>

<style scoped>
    .el-aside {
        min-height: 100vh;
    }

    .el-header {
        padding: 0;
    }
</style>