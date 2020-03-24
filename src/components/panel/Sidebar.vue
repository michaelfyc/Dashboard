<template>
    <el-menu mode="vertical" background-color="#eef1f6"
             :default-active="$route.path.substr($route.path.lastIndexOf('/')+1)"
             text-color="#48576a"
             active-text-color="#20a0ff"
             router>
        <el-menu-item index="index">首页</el-menu-item>
        <el-menu-item index="profile">个人资料</el-menu-item>
        <el-submenu index="order">
            <template slot="title">管理订单</template>
            <el-menu-item index="newOrder">增加订单</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
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