<template>
    <el-form-item label="附加配件">
        <el-select v-model="accessories" :disabled="hasAccessories()" multiple clearable @change="handleChange">
            <el-option v-for="option in options" :label="option.label" :value="option.value"
                       :key="option.value"></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
    export default {
        name: "ProductAccessories",
        data() {
            return {
                accessories: [],
                options: [
                    {value: "Pen", label: "手写笔"},
                    {value: "Charger", label: "充电器"},
                    {value: "Mouse", label: "鼠标"},
                    {value: "KeyBoard", label: "键盘"},
                    {value: "Other", label: "其他"}
                ]
            }
        },
        props: ["needAccessories"],
        methods: {
            handleChange() {
                this.$emit("transferAccessories", this.accessories);
            }
        },
        computed: {
            hasAccessories() {
                return function () {
                    return !this.needAccessories;
                }
            }
        }
    }
</script>

<style scoped>

</style>