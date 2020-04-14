<template>
    <el-form :model="stockEditForm" label-width="130px" label-position="right" ref="stockEditForm" :rules="itemRules"
             v-loading="loading">
        <el-form-item label="商品名" prop="productName">
            <el-input v-model="stockEditForm.productName"></el-input>
        </el-form-item>
        <ProductType @transferProductType="getProductType" :ajaxType="stockEditForm.productType"></ProductType>
        <!--进价-->
        <el-row>
            <el-col :span="6">
                <el-form-item label="单价">
                    <el-input-number v-model="stockEditForm.money.price" :precision="2" :step="0.01"
                                     controls-position="right" :min="0"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="数量">
                    <el-input-number v-model="stockEditForm.money.num" :step="1" controls-position="right"
                                     :min="0"></el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="产品描述" label-width="130px" class="productDescription">
            <el-input v-if="stockEditForm.productType[0]=='Other'"
                      v-model="stockEditForm.productDescription.description"></el-input>
        </el-form-item>
        <!--颜色和成色-->
        <el-row v-if="stockEditForm.productType[0]!='Other'">
            <el-col :span="6">
                <el-form-item label="颜色" prop="color">
                    <el-select v-model="stockEditForm.productDescription.color" clearable>
                        <el-option v-for="color in colors" :key="color.value"
                                   :label="color.label" :value="color.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="成色" prop="outlook">
                    <el-input v-model="stockEditForm.productDescription.outlook"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <ProductMemory :productType="stockEditForm.productType[0]" @transferMemory="getMemory"
                       :ajaxMemo="stockEditForm.productDescription.memory"></ProductMemory>
        <ProductStorage :productType="stockEditForm.productType[0]" @transferStorage="getStorage"
                        :ajaxStorage="stockEditForm.productDescription.storage"></ProductStorage>
        <el-form-item label="进货人" prop="creator">
            <el-input v-model="stockEditForm.creator"></el-input>
        </el-form-item>
        <el-form-item label="进货人联系方式" prop="contact">
            <el-input v-model="stockEditForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="进货渠道" prop="platform">
            <el-input v-model="stockEditForm.platform"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea" v-model="stockEditForm.note"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleEdit">修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import ProductType from "../order/ProductType";
    import ProductStorage from "../order/ProductStorage";
    import ProductMemory from "../order/ProductMemory";
    import stock from "../../utils/stockRequests"

    export default {
        name: "EditStock",
        components: {ProductMemory, ProductStorage, ProductType},
        data() {
            return {
                loading: false,
                stockEditForm: {
                    productName: "",
                    productType: [],
                    money: {
                        num: 0,
                        price: 0
                    },
                    productDescription: {
                        color: "",
                        outlook: ""
                    },
                    creator: "",
                    contact: "",
                    platform: "",
                    note: ""
                },
                itemRules: {
                    productName: [{required: true, message: "请输入产品名", trigger: "blur"}],
                    creator: [{required: true, message: "请输入进货人姓名", trigger: "blur"}],
                    productType: [{required: true, message: "请选择产品类型", trigger: "blur"}],
                    contact: [{required: true, message: "请输入进货人联系方式", trigger: "blur"}],
                    platform: [{required: true, message: "请输入进货渠道", trigger: "blur"}],
                },
                colors: [
                    {value: "black", label: "黑色"},
                    {value: "silver", label: "银色"},
                    {value: "gold", label: "金色"},
                    {value: "white", label: "白色"},
                    {value: "blue", label: "蓝色"},
                    {value: "red", label: "红色"},
                    {value: "green", label: "绿色"},
                    {value: "purple", label: "紫色"},
                    {value: "yellow", label: "黄色"}
                ]
            }
        },
        methods: {
            /**
             * 修改库存
             */
            handleEdit() {
                this.$refs['stockEditForm'].validate((valid) => {
                    if (valid) {
                        this.$confirm("真的要修改么？", "提示", {
                            confirmButtonText: "真的要修改！",
                            cancelButtonText: "算了吧..",
                            type: "warning"
                        })
                            .then(() => {
                                this.loading = true;
                                let data = {
                                    userId: this.$store.state.user.uid,
                                    stockId: this.$route.query.stockId,
                                    stock: this.stockEditForm
                                };
                                stock.editStock("/api/editStockInfo", data);
                                this.loading = false;
                            })
                            .catch(() => {
                                this.$message.info("已取消");
                                this.$router.push("/dashboard/stockList");
                            })
                    } else {
                        console.warn("有东西没好好填");
                        return false;
                    }
                });

            },

            getProductType(productType) {
                this.stockEditForm.productType = productType;
            },
            getStorage(storage) {
                this.stockEditForm.productDescription.storage = storage
            },
            getMemory(memory) {
                this.stockEditForm.productDescription.memory = memory;
            }
        },

        mounted() {
            let stockId = this.$route.query.stockId;
            this.axios.post("/api/getStockInfo", {stockId: stockId})
                .then(response => {
                    this.stockEditForm = response.data.stock;
                })
                .catch(e => {
                    if (e.response.status === 404) {
                        this.$message.error("库存不存在！");
                        this.$router.push("/dashboard/stockList");
                    }
                    console.error(e);
                    this.$message.error("加载库存信息失败！");
                    this.$router.push("/dashboard/stockList");
                })
        }
    }
</script>

<style scoped>

</style>