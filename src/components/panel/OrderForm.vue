<template>
    <el-form :model="orderForm" label-width="120px" label-position="right" ref="orderForm" :rules="orderRules"
             v-loading="loading">
        <el-form-item label="商品名" prop="productName">
            <el-input v-model="orderForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="productType">
            <el-cascader v-model="orderForm.productType" :options="types" :props="expandTrigger">
            </el-cascader>
        </el-form-item>
        <el-form-item label="价格">
            <el-input-number v-model="orderForm.price" :precision="2" :step="0.01"
                             controls-position="right"></el-input-number>
        </el-form-item>
        <span>产品描述</span>
        <el-form-item label="颜色">
            <el-select v-model="orderForm.productDescription.color" clearable>
                <el-option v-for="color in colors" :key="color.value"
                           :label="color.label" :value="color.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="容量" v-if="hasStorage">
            <el-radio-group v-model="orderForm.productDescription.storage" v-if="isProduct('Phone')">
                <el-radio label="64">64G</el-radio>
                <el-radio label="128">128G</el-radio>
                <el-radio label="256">256G</el-radio>
            </el-radio-group>
            <el-radio-group v-model="orderForm.productDescription.storage" v-if="isProduct('Computer')">
                <el-radio label="128">128G</el-radio>
                <el-radio label="256">256G</el-radio>
                <el-radio label="512">512G</el-radio>
                <el-radio label="1024">1T</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="购买人姓名" prop="purchaser">
            <el-input v-model="orderForm.purchaser"></el-input>
        </el-form-item>
        <el-form-item label="购买人联系方式" prop="phoneNum">
            <el-input v-model="orderForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleNew">新建订单</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "OrderForm",
        data() {
            return {
                loading: false,
                orderForm: {
                    productName: "",
                    productType: [],
                    price: 0,
                    productDescription: {
                        color: "",
                        storage: ""
                    },
                    purchaser: "",
                    phoneNum: ""
                },
                orderRules: {},//TODO 加rules验证规则
                types: [
                    {
                        value: "Phone", label: "手机", children: [
                            {value: "ApplePhone", label: "苹果手机"},
                            {value: "AndroidPhone", label: "安卓手机"}
                        ]
                    },
                    {
                        value: "Computer", label: "电脑", children: [
                            {
                                value: "Laptop", label: "笔记本", children: [
                                    {value: "WindowsLaptop", label: "Windows系统"},
                                    {value: "AppleLaptop", label: "Mac系统"}
                                ]
                            },
                            {
                                value: "Desktop", label: "台式机", children: [
                                    {value: "WindowsDesktop", label: "Windows系统"},
                                    {value: "AppleDesktop", label: "Mac系统"}
                                ]
                            }
                        ]
                    },
                    {value: "Pad", label: "平板电脑"},
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
                    {value: "other", label: "其他"}
                ],
                colors: [
                    {value: "black", label: "黑色"},
                    {value: "silver", label: "银色"},
                    {value: "gold", label: "金色"},
                    {value: "blue", label: "蓝色"},
                    {value: "red", label: "红色"},
                    {value: "green", label: "绿色"},
                    {value: "purple", label: "紫色"},
                    {value: "yellow", label: "黄色"}
                ],
                expandTrigger: {expandTrigger: "hover"}
            }
        },
        methods: {
            handleNew() {
                //TODO 发送给后台，存到state计数
                alert(JSON.stringify(this.orderForm));
            }
        },

        computed: {
            isProduct() {
                return function (product) {
                    return this.orderForm.productType.indexOf(product) !== -1;
                }
            },
            hasStorage() {
                if (this.orderForm.productType.length === 0) {
                    return false;
                } else return this.orderForm.productType.indexOf("Accessories") === -1 && this.orderForm.productType.indexOf("EarPhone") === -1;
            }
        }
    }
</script>

<style scoped>

</style>