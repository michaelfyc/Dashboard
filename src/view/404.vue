<template>
    <div class="outer">
        <div class="left">
            <el-image :src="src"></el-image>
        </div>
        <div class="right">
            <p>OOPS!</p>
            <div class="inform">
                The page you're looking for does not exist!
            </div>
            <br>
            <div style="font-size:15px">
                <el-link type="primary" :underline="false" href="#/dashboard">Click here to go to Home page</el-link>
            </div>
        </div>
    </div>
</template>

<script>
    import pic from "../assets/images/404.png"

    export default {
        name: "NotFound",
        data() {
            return {
                src: pic
            }
        }
    }
</script>

<style scoped>
    .outer {
        position: relative;
        height: 100%;
    }

    .left {
        position: absolute;
        width: 1200px;
        left: 100px;
        top: 50px;
    }

    .right {
        position: absolute;
        left: 960px;
        height: 100%;
        right: 100px;
        top: 200px;
    }

    .right p {
        font-weight: bold;
        font-size: 20px;
    }

    .right .inform {
        font-size: 15px;
        color: slategrey;
    }
</style>