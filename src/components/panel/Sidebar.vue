<template>
    <el-menu mode="vertical" background-color="#545c64"
             :default-active="$route.path.substr($route.path.lastIndexOf('/')+1)"
             text-color="#fff"
             active-text-color="#ffd04b"
             router>
        <el-menu-item index="index">首页</el-menu-item>
        <el-menu-item index="profile">个人资料</el-menu-item>
        <el-submenu index="order">
            <template slot="title">管理订单</template>
            <el-menu-item index="newOrder">增加订单</el-menu-item>
            <el-menu-item>修改/删除订单</el-menu-item>
            <el-menu-item>订单列表</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {}
        },

        methods: {}
    }
</script>

<style scoped>

</style>