<template>
    <el-form :model="itemForm" label-width="120px" label-position="right" ref="itemForm" :rules="itemRules"
             v-loading="loading">
        <el-form-item label="商品名" prop="productName">
            <el-input v-model="itemForm.productName"></el-input>
        </el-form-item>
        <ProductType @transferProductType="getProductType"></ProductType>
        <!--进价-->
        <el-form-item label="进价">
            <el-input-number v-model="itemForm.purchasePrice" :precision="2" :step="0.01"
                             controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="产品描述" label-width="130px" class="productDescription">
            <!--           <label>产品描述</label>-->
        </el-form-item>
        <!--颜色和成色-->
        <el-row>
            <el-col :span="6">
                <el-form-item label="颜色" prop="color">
                    <el-select v-model="itemForm.productDescription.color" clearable>
                        <el-option v-for="color in colors" :key="color.value"
                                   :label="color.label" :value="color.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="成色" prop="outlook">
                    <el-input v-model="itemForm.productDescription.outlook"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <ProductMemory :productType="itemForm.productType[0]" @transferMemory="getMemory"></ProductMemory>
        <ProductStorage :productType="itemForm.productType[0]" @transferStorage="getStorage"></ProductStorage>
        <el-form-item label="进货平台" prop="platform">
            <el-input v-model="itemForm.platform"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea" v-model="itemForm.note"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleNew">入库</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import ProductType from "../order/ProductType";
    import ProductStorage from "../order/ProductStorage";
    import ProductMemory from "../order/ProductMemory";
    import item from "../../utils/itemRequests"

    export default {
        name: "itemForm",
        components: {ProductMemory, ProductStorage, ProductType},
        data() {
            return {
                loading: false,
                itemForm: {
                    productName: "",
                    productType: [],
                    withAccessories: false,
                    purchasePrice: 0,
                    productDescription: {
                        color: "",
                        outlook: ""
                    },
                    platform: "",
                    note: ""
                },
                itemRules: {
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
            handleNew() {
                this.$refs['itemForm'].validate((valid) => {
                    if (valid) {
                        let data = {userId: this.$store.state.user.uid, item: this.itemForm};
                        item.postItem("/api/addItem", data);
                    } else {
                        console.warn("有东西没好好填");
                        return false;
                    }
                });

            },
            getProductType(productType) {
                this.itemForm.productType = productType;
            },
            getStorage(storage) {
                this.itemForm.productDescription.storage = storage
            },
            getMemory(memory) {
                this.itemForm.productDescription.memory = memory;
            }
        }
    }
</script>

<style scoped>

</style>