<template>
    <el-form :model="inventory" label-width="80px" label-position="top">
        <el-form-item label="产品名">
            <el-input v-model="inventory.itemName"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "NewItem",
        data() {
            return {
                inventory: {
                    itemName: ""
                }
            }
        }
    }
</script>

<style scoped>

</style>