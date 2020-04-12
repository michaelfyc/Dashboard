<template>
    <!--新建库存订单-->
    <div>
        <el-dialog :visible.sync="stockTableVisible">
            <SelectableStockList @transferSelectedRow="getRow"/>
            <div slot="footer">
                <el-button type="primary" @click=" stockTableVisible=false">确定</el-button>
            </div>
        </el-dialog>
        <el-form :model="orderForm" label-width="120px" label-position="right" ref="orderForm" :rules="orderRules"
                 v-loading="loading">
            <el-form-item label="产品名称" prop="productName">
                <span v-text="orderForm.productName"></span>
                <el-button type="primary" @click="stockTableVisible=true" style="margin-left:10px">选择库存产品</el-button>
            </el-form-item>
            <el-form-item label="产品类型">
                <span v-text="orderForm.productType.length>0?translateType(orderForm.productType):''"></span>
            </el-form-item>
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
                        <el-input-number v-model="orderForm.num" :step="1"
                                         controls-position="right" :min="0" :max="max"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="产品描述" label-width="130px" class="productDescription">
                <span v-text="orderForm.productDescription.description"
                      v-if="!!orderForm.productDescription.description"></span>
            </el-form-item>
            <!--颜色和成色-->
            <el-row v-if="!orderForm.productDescription.description">
                <el-col :span="6">
                    <el-form-item label="颜色" prop="color">
                        <span v-text="colorMap[orderForm.productDescription.color]"></span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="成色" prop="outlook">
                        <span v-text="orderForm.productDescription.outlook"></span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="内存" v-if="orderForm.productDescription.memory!==undefined">
                        <span v-text="orderForm.productDescription.memory"></span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="容量" v-if="orderForm.productDescription.storage!==undefined">
                        <span v-text="orderForm.productDescription.storage"></span>
                    </el-form-item>
                </el-col>
            </el-row>
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
    </div>
</template>

<script>
    import order from "../../utils/orderRequests"
    import SelectableStockList from "../inventory/SelectableStockList";

    export default {
        name: "OrderForm",
        components: {SelectableStockList},
        data() {
            return {
                stockTableVisible: false,
                loading: false,
                max: 1,
                orderForm: {
                    productName: "",
                    productType: [],
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
                colorMap: {
                    "red": "红色",
                    "blue": "蓝色",
                    "green": "绿色",
                    "black": "黑色",
                    "silver": "银色",
                    "gold": "金色",
                    "yellow": "黄色",
                    "white": "白色",
                    "purple": "紫色"
                }
            }
        },
        methods: {
            handleNew() {
                this.$refs['orderForm'].validate((valid) => {
                    if (valid) {
                        let data = {userId: this.$store.state.user.uid, order: this.orderForm};
                        order.postOrder("/api/addStockOrder", data);
                    } else {
                        console.warn("有东西没好好填");
                        return false;
                    }
                });

            },

            getRow(value) {
                this.orderForm.productName = value.productName;
                this.orderForm.productType = value.productType;
                this.orderForm.productDescription = value.productDescription;
                this.max = value.num;
            },

            translateType(type) {
                let typeMap = {
                    "Other": "其他",
                    "Phone": "手机",
                    "Pad": "平板电脑",
                    "Computer": "电脑",
                    "Accessories": "配件",
                    "EarPhones": "耳机",
                    "Laptop": "笔记本",
                    "Desktop": "台式机",
                    "Apple": "苹果",
                    "Android": "安卓",
                    "Windows": "Windows系统",
                    "Noiseless": "降噪",
                    "Noise": "普通",
                    "Wired": "有线",
                    "Wireless": "无线"
                };
                if (type.length === 1) {
                    return typeMap[type[0]] ? typeMap[type[0]] : type[0]
                }
                if (type.length === 2) {
                    return typeMap[type[1]] + typeMap[type[0]]
                }
                return typeMap[type[1]] + typeMap[type[2]] + typeMap[type[0]];
            }
        }
    }
</script>

<style scoped>

</style>