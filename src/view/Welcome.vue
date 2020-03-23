<template>
    <el-container>
        <vue-canvas-nest :config="{opacity:0.7,count:300}"></vue-canvas-nest>
        <el-card class="welcomeCard">
            <router-view></router-view>
        </el-card>
    </el-container>
</template>

<script>
    import VueCanvasNest from "vue-canvas-nest/src/vueCanvasNest";

    export default {
        name: "Welcome",
        components: {VueCanvasNest}
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