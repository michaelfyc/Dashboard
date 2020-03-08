<template>
    <el-row>
        <el-col span="12">
            <el-menu mode="vertical" background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b">
                <el-menu-item index="console">首页</el-menu-item>
                <el-menu-item index="profile">个人资料</el-menu-item>
                <el-submenu>
                    <template slot="title">管理订单</template>
                    <el-menu-item>增加订单</el-menu-item>
                    <el-menu-item>修改/删除订单</el-menu-item>
                    <el-menu-item>订单列表</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
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