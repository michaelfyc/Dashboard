<template>
    <el-form-item label="内存大小" v-show="hasMemory">
        <el-radio-group v-if="isMemoryOf('Phone')" v-model="memory" @change="handleChange" key="Phone">
            <el-radio label="4G">4G</el-radio>
            <el-radio label="6G">6G</el-radio>
            <el-radio label="8G">8G</el-radio>
        </el-radio-group>
        <el-radio-group v-else-if="isMemoryOf('Computer')" v-model="memory" @change="handleChange" key="Computer">
            <el-radio label="4G">4G</el-radio>
            <el-radio label="8G">8G</el-radio>
            <el-radio label="16G">16G</el-radio>
            <el-radio label="32G">32G</el-radio>
        </el-radio-group>
    </el-form-item>
</template>

<script>
    export default {
        name: "ProductMemory",
        props: ["productType"],
        data() {
            return {
                memory: ""
            }
        },
        computed: {
            hasMemory() {
                return !!this.productType && (this.productType === "Phone" || this.productType === "Computer");
            },
            isMemoryOf() {
                return function (productType) {
                    return productType === this.productType;
                }
            }
        },
        methods: {
            handleChange() {
                this.$emit("transferMemory", this.memory);
            }
        }
    }
</script>

<style scoped>

</style>