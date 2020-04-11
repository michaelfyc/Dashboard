<template>
    <!--新建库存订单-->
    <el-form :model="orderForm" label-width="120px" label-position="right" ref="orderForm" :rules="orderRules"
             v-loading="loading">
        <el-form-item label="产品名称">
            <el-autocomplete v-model="orderForm.productName" :fetch-suggestions="getProductName"></el-autocomplete>
        </el-form-item>
        <el-form-item label="产品类型">
            <span v-text="orderForm.productType"></span>
        </el-form-item>
        <el-form-item label="附赠配件">
            <el-switch v-model="orderForm.withAccessories"></el-switch>
        </el-form-item>
        <ProductAccessories @transferAccessories="getAccessories"
                            :needAccessories="orderForm.withAccessories"></ProductAccessories>
        <!--进价和售价和邮费-->
        <el-row>
            <el-col :span="6">
                <el-form-item label="售价">
                    <el-input-number v-model="orderForm.money.soldPrice" :precision="2" :step="0.01"
                                     controls-position="right" :min="0"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="邮费">
                    <el-input-number v-model="orderForm.money.postPrice" :precision="2" :step="0.01"
                                     controls-position="right" :min="0"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="数量">
                    <el-input-number v-model="orderForm.num" :precision="2" :step="0.01"
                                     controls-position="right" :min="0"></el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="产品描述" label-width="130px" class="productDescription">
            <!--           <label>产品描述</label>-->
        </el-form-item>
        <!--颜色和成色-->
        <el-row>
            <el-col :span="6">
                <el-form-item label="颜色" prop="color">
                    <el-select v-model="orderForm.productDescription.color" clearable>
                        <el-option v-for="color in colors" :key="color.value"
                                   :label="color.label" :value="color.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="成色" prop="outlook">
                    <el-input v-model="orderForm.productDescription.outlook"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <ProductMemory :productType="orderForm.productType[0]" @transferMemory="getMemory"></ProductMemory>
        <ProductStorage :productType="orderForm.productType[0]" @transferStorage="getStorage"></ProductStorage>
        <el-form-item label="购买人姓名" prop="purchaser">
            <el-input v-model="orderForm.purchaser"></el-input>
        </el-form-item>
        <el-form-item label="购买人联系方式" prop="contact" label-width="130px">
            <el-input v-model="orderForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="出售方式" prop="platform">
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
    import ProductStorage from "./ProductStorage";
    import ProductMemory from "./ProductMemory";
    import ProductAccessories from "./ProductAccessories";
    import order from "../../utils/orderRequests"

    export default {
        name: "OrderForm",
        components: {ProductAccessories, ProductMemory, ProductStorage},
        data() {
            return {
                loading: false,
                orderForm: {
                    productName: "",
                    productType: "",
                    withAccessories: false,
                    money: {
                        soldPrice: 0,
                        postPrice: 0,
                    },
                    num: 0,
                    productDescription: {
                        color: "",
                        outlook: ""
                    },
                    purchaser: "",
                    contact: "",
                    platform: "",
                    note: ""
                },
                orderRules: {
                    productName: [{required: true, message: "请输入产品名", trigger: "blur"}],
                    purchaser: [{required: true, message: "请输入购买人姓名", trigger: "blur"}],
                    productType: [{required: true, message: "请选择产品类型", trigger: "blur"}],
                    contact: [{required: true, message: "请输入购买人联系方式", trigger: "blur"}],
                    platform: [{required: true, message: "请输入出售方式", trigger: "blur"}],
                },
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
                items: []
            }
        },
        methods: {
            handleNew() {
                this.$refs['orderForm'].validate((valid) => {
                    if (valid) {
                        let data = {userId: this.$store.state.user.uid, order: this.orderForm};
                        order.postOrder("/api/addOrder", data);
                    } else {
                        console.warn("有东西没好好填");
                        return false;
                    }
                });

            },

            getProductName(queryString, callback) {
                let result = queryString ? this.items.filter(this.createProductNameFilter(queryString)) : this.items;
                callback(result);
            },

            createProductNameFilter(query) {
                return (productName) => {
                    return productName.value.toLowerCase().indexOf(query.toLowerCase()) === 0;
                }
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

        mounted() {
            this.axios.get("/api/getStock")
                .then(response => {
                    this.items = response.data.items;
                    //TODO 产品类型和产品描述自动填写,盈利自动运算
                })
                .catch(e => {
                    console.error(e);
                    this.$message.error("库存加载失败！");
                })
        }
    }
</script>

<style scoped>

</style>