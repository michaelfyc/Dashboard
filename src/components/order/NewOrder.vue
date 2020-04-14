<template>
    <!--新建其他订单-->
    <el-form :model="orderForm" label-width="120px" label-position="right" ref="orderForm" :rules="orderRules"
             v-loading="loading">
        <el-form-item label="商品名" prop="productName">
            <el-input v-model="orderForm.productName"></el-input>
        </el-form-item>
        <ProductType @transferProductType="getProductType"></ProductType>
        <!--进价和售价和邮费-->
        <el-row>
            <el-col :span="6">
                <el-form-item label="进价">
                    <el-input-number v-model="orderForm.money.purchasePrice" :precision="2" :step="0.01"
                                     controls-position="right" :min="0"></el-input-number>
                </el-form-item>
            </el-col>
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
        </el-row>
        <el-form-item label="产品描述" label-width="130px" class="productDescription">
            <el-input v-model="orderForm.productDescription.description"></el-input>
        </el-form-item>
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
    import order from "../../utils/orderRequests"
    import ProductType from "./ProductType";

    export default {
        name: "NewOrder",
        components: {ProductType},
        data() {
            return {
                loading: false,
                orderForm: {
                    productName: "",
                    productType: [],
                    money: {
                        purchasePrice: 0,
                        soldPrice: 0,
                        postPrice: 0
                    },
                    productDescription: {
                        description: ""
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
                }
            }
        },
        methods: {
            handleNew() {
                this.$refs['orderForm'].validate((valid) => {
                    if (valid) {
                        let data = {userId: this.$store.state.user.uid, order: this.orderForm};
                        order.postOrder("/api/addOtherOrder", data);
                    } else {
                        console.warn("有东西没好好填");
                        return false;
                    }
                });

            },

            getProductType(productType) {
                this.orderForm.productType = productType;
            }
        }
    }
</script>

<style scoped>

</style>