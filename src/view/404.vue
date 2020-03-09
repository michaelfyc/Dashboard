<template>
    <div>
        <div>
            <el-image :src="src"></el-image>
        </div>
        404 Not Found
        <!--        TODO 404的图片和美化-->
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

</style>