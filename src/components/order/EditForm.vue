<template>
    <el-form :model="orderForm" label-width="120px" label-position="right" ref="orderForm" :rules="orderRules"
             v-loading="loading">
        <el-form-item label="商品名" prop="productName">
            <el-input v-model="orderForm.productName"></el-input>
        </el-form-item>
        <ProductType @transferProductType="getProductType" :ajaxType="orderForm.productType"></ProductType>
        <el-form-item label="附赠配件">
            <el-switch v-model="orderForm.withAccessories"></el-switch>
        </el-form-item>
        <ProductAccessories @transferAccessories="getAccessories" :ajaxAcc="orderForm.accessories"
                            :needAccessories="orderForm.withAccessories"></ProductAccessories>
        <!--进价和售价和邮费-->
        <el-row>
            <el-col :span="6">
                <el-form-item label="进价">
                    <el-input-number v-model="orderForm.money.purchasePrice" :precision="2" :step="0.01"
                                     controls-position="right" :min="0"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="售格">
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
        <ProductMemory :productType="orderForm.productType[0]" :ajaxMemo="orderForm.productDescription.memory"
                       @transferMemory="getMemory"></ProductMemory>
        <ProductStorage :productType="orderForm.productType[0]" :ajaxStorage="orderForm.productDescription.storage"
                        @transferStorage="getStorage"></ProductStorage>
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
            <el-button type="warning" @click="handleEdit">修改订单</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import ProductType from "./ProductType";
    import ProductAccessories from "./ProductAccessories";
    import ProductMemory from "./ProductMemory";
    import ProductStorage from "./ProductStorage";

    export default {
        name: "EditForm",
        components: {ProductType, ProductAccessories, ProductMemory, ProductStorage},
        data() {
            return {
                loading: false,
                orderForm: {
                    productName: "",
                    productType: [],
                    withAccessories: false,
                    money: {
                        purchasePrice: 0,
                        soldPrice: 0,
                        postPrice: 0
                    },
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
                ]
            }
        },

        methods: {
            handleEdit() {
                this.$confirm("真的要修改么？", "提示", {
                    confirmButtonText: "真的要修改！",
                    cancelButtonText: "算了吧..",
                    type: "warning"
                })
                    .then(() => {

                        let data = {
                            userId: this.$store.state.user.user.uid,
                            orderId: this.$route.query.orderId,
                            order: this.orderForm
                        };
                        this.axios.put("/api/editOrderInfo", data)
                            .then(response => {
                                if (response.data.status === "success") {
                                    this.$message.success("修改订单信息成功！");
                                    this.$router.push("/dashboard/orderList");
                                } else {
                                    this.$message.error("修改订单信息失败！");
                                }
                            })
                            .catch(e => {
                                console.error(e);
                                this.$message.error("系统错误！");
                                this.$router.push("/dashboard/orderList");
                            })
                    })
                    .catch(() => {
                        this.$message.info("已取消");
                        this.$router.push("/dashboard/orderList");
                    });

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
            let orderId = this.$route.query.orderId;
            this.axios.post("/api/getOrderInfo", {orderId: orderId})
                .then(response => {
                    this.orderForm = response.data.order;
                    this.orderForm.withAccessories = Boolean(response.data.order.withAccessories);
                })
                .catch(e => {
                    if (e.response.status === 404) {
                        this.$message.error("订单不存在！");
                        this.$router.push("/dashboard/orderList");
                    }
                    console.error(e);
                    this.$message.error("加载订单信息失败！");
                    this.$router.push("/dashboard/orderList");
                })
        }
    }
</script>

<style scoped>

</style>