<template>
    <el-form :model="orderForm" label-width="120px" label-position="right" ref="orderForm" :rules="orderRules"
             v-loading="loading">
        <el-form-item label="商品名" prop="productName">
            <el-input v-model="orderForm.productName"></el-input>
        </el-form-item>
        <ProductType @transferProductType="getProductType"></ProductType>
        <el-form-item label="附赠配件">
            <el-switch v-model="orderForm.withAccessories"></el-switch>
        </el-form-item>
        <ProductAccessories @transferAccessories="getAccessories"
                            :needAccessories="orderForm.withAccessories"></ProductAccessories>
        <!--进价和售价和邮费-->
        <el-row>
            <el-col :span="6">
                <el-form-item label="进价">
                    <el-input-number v-model="orderForm.money.incomePrice" :precision="2" :step="0.01"
                                     controls-position="right"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="售格">
                    <el-input-number v-model="orderForm.money.soldPrice" :precision="2" :step="0.01"
                                     controls-position="right"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="邮费">
                    <el-input-number v-model="orderForm.money.postPrice" :precision="2" :step="0.01"
                                     controls-position="right"></el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
        <span>产品描述</span>
        <!--颜色和成色-->
        <el-row>
            <el-col :span="4">
                <el-form-item label="颜色">
                    <el-select v-model="orderForm.productDescription.color" clearable>
                        <el-option v-for="color in colors" :key="color.value"
                                   :label="color.label" :value="color.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="成色">
                    <el-input v-model="orderForm.productDescription.outlook"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <ProductMemory :productType="orderForm.productType[0]" @transferMemory="getMemory"></ProductMemory>
        <ProductStorage :productType="orderForm.productType[0]" @transferStorage="getStorage"></ProductStorage>
        <el-form-item label="购买人姓名" prop="purchaser">
            <el-input v-model="orderForm.purchaser"></el-input>
        </el-form-item>
        <el-form-item label="购买人联系方式" prop="phoneNum">
            <el-input v-model="orderForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="出售方式">
            <el-input v-model="orderForm.platform"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea" v-model="orderForm.note"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleNew">新建订单</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import ProductType from "./ProductType";
    import ProductStorage from "./ProductStorage";
    import ProductMemory from "./ProductMemory";
    import ProductAccessories from "./ProductAccessories";

    export default {
        name: "OrderForm",
        components: {ProductAccessories, ProductMemory, ProductStorage, ProductType},
        data() {
            return {
                loading: false,
                orderForm: {
                    productName: "",
                    productType: [],
                    withAccessories: false,
                    money: {
                        incomePrice: 0,
                        soldPrice: 0,
                        postPrice: 0
                    },
                    productDescription: {
                        color: "",
                        outlook: ""
                    },
                    purchaser: "",
                    phoneNum: "",
                    platform: "",
                    note: ""
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
            },
            getProductType(productType) {
                this.orderForm.productType = productType;
            },
            getStorage(storage) {
                this.orderForm.productDescription.storage = storage
            },
            getMemory(memory) {
                this.orderForm.productDescription.memory = memory;
            },
            getAccessories(acc) {
                this.orderForm.accessories = acc;
            }
        },

        computed: {
            /*isProduct() {
                return function (product) {
                    return this.orderForm.productType.indexOf(product) !== -1;
                }
            },
            hasStorage() {
                if (this.orderForm.productType.length === 0) {
                    return false;
                } else return this.orderForm.productType.indexOf("Accessories") === -1 && this.orderForm.productType.indexOf("EarPhone") === -1;
            }*/
        }
    }
</script>

<style scoped>

</style>