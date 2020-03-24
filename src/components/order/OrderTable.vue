<template>
    <el-table :data="orderList" border style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="table-expand">
                    <el-form-item label="产品颜色">
                        <span v-text="props.row.color"></span>
                    </el-form-item>
                    <el-form-item label="产品外观">
                        <span v-text="props.row.outlook"></span>
                    </el-form-item>
                    <el-form-item label="产品内存" v-show="hasMemory(props.row)">
                        <span v-text="props.row.memory"></span>
                    </el-form-item>
                    <el-form-item label="产品容量" v-show="hasStorage(props.row)">
                        <span v-text="props.row.storage"></span>
                    </el-form-item>
                    <el-form-item label="配件">
                        <span v-text="props.row.accessories.join('，')"></span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span v-text="props.row.remark===null?'空':props.row.remark"></span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="150" sortable></el-table-column>
        <el-table-column prop="productName" label="产品名"></el-table-column>
        <el-table-column prop="productType" label="产品类型"></el-table-column>
        <el-table-column prop="purchasePrice" label="进价" sortable></el-table-column>
        <el-table-column prop="soldPrice" label="售价" sortable></el-table-column>
        <el-table-column prop="postPrice" label="邮费" sortable></el-table-column>
        <el-table-column prop="profit" label="盈利" sortable></el-table-column>
        <el-table-column prop="purchaser" label="购买人"></el-table-column>
        <el-table-column prop="contact" label="联系方式" width="150"></el-table-column>
        <el-table-column prop="platform" label="平台"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
                <el-button type="text" style="color:red" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "OrderTable",
        data() {
            return {
                orderList: [{
                    date: "2020/3/24",
                    productName: "IPhone X Pro",
                    productType: "Pad",
                    memory: "8G",
                    storage: "256G",
                    soldPrice: 7999,
                    purchasePrice: 6999,
                    postPrice: 20,
                    profit: 980,
                    color: "银色",
                    outlook: "全新",
                    purchaser: "张三",
                    contact: "139**132471",
                    platform: "vx",
                    accessories: ["充电器", "耳机"],
                    remark: null
                }]
            }
        },
        methods: {
            hasMemory(row) {
                return row.productType === "Phone" || row.productType === "Computer";
            },
            hasStorage(row) {
                return row.productType === "Phone" || row.productType === "Computer" || row.productType === "Pad";
            },
            tableRowClassName({row}) {
                //如果收益少于50就标红
                if (row.profit < 50) {
                    return "loss-row"
                }
                //收益大于100就标绿
                if (row.profit > 100) {
                    return "earn-row"
                }
                return ""
            },
            handleEdit(row) {
                console.log(row)
            },
            handleDelete(row) {
                console.log(row)
            }
        },
        computed: {}
    }
</script>

<style>
    .el-table .loss-row {
        background: #fef0f0;
    }

    .el-table .earn-row {
        background: #f0f9eb;
    }

    .table-expand {
        font-size: 0;
    }

    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>