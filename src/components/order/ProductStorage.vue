<template>
    <el-form-item label="容量" v-if="hasStorage">
        <el-radio-group v-model="storage" v-if="isStorageOf('Phone')" @change="handleChange">
            <el-radio label="64">64G</el-radio>
            <el-radio label="128">128G</el-radio>
            <el-radio label="256">256G</el-radio>
        </el-radio-group>
        <el-radio-group v-model="storage" v-if="isStorageOf('Computer')" @change="handleChange">
            <el-radio label="128">128G</el-radio>
            <el-radio label="256">256G</el-radio>
            <el-radio label="512">512G</el-radio>
            <el-radio label="1024">1T</el-radio>
        </el-radio-group>
        <el-radio-group v-model="storage" v-if="isStorageOf('Pad')" @change="handleChange">
            <el-radio label="256G">256G</el-radio>
            <el-radio label="512G">512G</el-radio>
            <el-radio label="1T">1T</el-radio>
        </el-radio-group>
    </el-form-item>
</template>

<script>
    export default {
        name: "ProductStorage",
        props: ["productType"],
        data() {
            return {
                storage: ""
            }
        },
        computed: {
            hasStorage() {
                return !!this.productType && this.productType !== "Accessories" && this.productType !== "EarPhone"
                    && this.productType !== "Other";
            },
            isStorageOf() {
                return function (productType) {
                    return productType === this.productType;
                }
            }
        },
        methods: {
            handleChange() {
                this.$emit("transferStorage", this.storage);
            }
        }
    }
</script>

<style scoped>

</style>