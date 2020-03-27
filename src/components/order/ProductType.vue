<template>
    <el-form-item label="产品类型" prop="productType">
        <el-cascader :options="types" :props="expandTrigger" v-model="productType" @change="transferProductType">
        </el-cascader>
    </el-form-item>
</template>

<script>
    export default {
        name: "ProductType",
        data() {
            return {
                productType: [],
                types: [
                    {
                        value: "Phone", label: "手机", children: [
                            {value: "Apple", label: "苹果手机"},
                            {value: "Android", label: "安卓手机"}
                        ]
                    },
                    {value: "Pad", label: "平板电脑"},
                    {
                        value: "Computer", label: "电脑", children: [
                            {
                                value: "Laptop", label: "笔记本", children: [
                                    {value: "Windows", label: "Windows系统"},
                                    {value: "Apple", label: "Mac系统"}
                                ]
                            },
                            {
                                value: "Desktop", label: "台式机", children: [
                                    {value: "Windows", label: "Windows系统"},
                                    {value: "Apple", label: "Mac系统"}
                                ]
                            }
                        ]
                    },
                    {
                        value: "Accessories", label: "配件", children: [
                            {value: "Pen", label: "手写笔"},
                            {value: "Charger", label: "充电器"},
                            {value: "Mouse", label: "鼠标"},
                            {value: "KeyBoard", label: "键盘"}
                        ]
                    },
                    {
                        value: "EarPhone", label: "耳机", children: [
                            {
                                value: "Wireless", label: "无线耳机", children: [
                                    {value: "Noiseless", label: "降噪"},
                                    {value: "Noise", label: "非降噪"},
                                ]
                            },
                            {
                                value: "Wired", label: "有线耳机", children: [
                                    {value: "Noiseless", label: "降噪"},
                                    {value: "Noise", label: "非降噪"},
                                ]
                            }
                        ]
                    },
                    {value: "Other", label: "其他"}
                ],
                expandTrigger: {expandTrigger: "hover"},
            }
        },
        methods: {
            transferProductType() {
                this.$emit("transferProductType", this.productType)
            }
        }
    }
</script>

<style scoped>

</style>