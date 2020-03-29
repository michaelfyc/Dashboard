<template>
    <div>
        <el-table :data="orderList" border style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="orderId" label="订单号" v-if="false"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand">
                        <el-form-item label="产品颜色">
                            <span v-text="translateColor(props.row.productDescription.color)"></span>
                        </el-form-item>
                        <el-form-item label="产品外观">
                            <span v-text="props.row.productDescription.outlook"></span>
                        </el-form-item>
                        <el-form-item label="产品内存" v-show="hasMemory(props.row)">
                            <span v-text="props.row.productDescription.memory"></span>
                        </el-form-item>
                        <el-form-item label="产品容量" v-show="hasStorage(props.row)">
                            <span v-text="props.row.productDescription.storage"></span>
                        </el-form-item>
                        <el-form-item label="配件">
                            <span v-text="translateAcc(props.row.accessories)"></span>
                        </el-form-item>
                        <el-form-item label="备注" v-show="hasNote(props.row)">
                            <span v-text="props.row.note"></span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="dateTime" label="日期" width="160" sortable></el-table-column>
            <el-table-column prop="productName" label="产品名" width="150"></el-table-column>
            <el-table-column prop="productType" label="产品类型" :formatter="translateType"></el-table-column>
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
                    <el-button type="text" style="color:red" size="small" @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next,jumper" :page-size="50" :total="total"
                       :current-page.sync="currentPage" @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
    import order from "../../utils/orderRequests"

    export default {
        name: "OrderTable",
        data() {
            return {
                orderList: [],
                currentPage: 1,
                total: 0
            }
        },
        methods: {
            /**
             * 把颜色从value翻译回中文label
             * @param color
             * @returns {any}
             */
            translateColor(color) {
                let colorMap = new Map();
                colorMap.set("red", "红色");
                colorMap.set("blue", "蓝色");
                colorMap.set("green", "绿色");
                colorMap.set("black", "黑色");
                colorMap.set("silver", "银色");
                colorMap.set("gold", "金色");
                colorMap.set("yellow", "黄色");
                colorMap.set("white", "白色");
                colorMap.set("purple", "紫色");
                return colorMap.get(color);
            },

            /**
             * 把英文配件value翻译成中文
             * @param acc
             * @returns {string | *}
             */
            translateAcc(acc) {
                if (!acc) {
                    return "无"
                }
                let accMap = {
                    "Charger": "充电器",
                    "Mouse": "鼠标",
                    "KeyBoard": "键盘",
                    "Pen": "手写笔",
                    "Earphone": "耳机",
                    "Other": "其他",
                };
                return acc.map(element => {
                    element = accMap[element];
                    return element;
                }).join("，");
            },

            translateType(row) {
                let typeMap = {
                    "Phone": "手机",
                    "Pad": "平板电脑",
                    "Computer": "电脑",
                    "Accessories": "配件",
                    "EarPhones": "耳机",
                    "Other": "其他",
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
                if (row.productType.length === 1) {
                    return typeMap[row.productType[0]]
                }
                if (row.productType.length === 2) {
                    return typeMap[row.productType[1]] + typeMap[row.productType[0]]
                }
                return typeMap[row.productType[1]] + typeMap[row.productType[2]] + typeMap[row.productType[0]];
            },

            hasNote(row) {
                return !!row.note;
            },
            hasMemory(row) {
                return row.productType === "Phone" || row.productType === "Computer";
            },
            hasStorage(row) {
                return row.productType === "Phone" || row.productType === "Computer" || row.productType === "Pad";
            },

            /**
             * 不同的盈利用不同的底色
             * @param row
             * @returns {string}
             */
            tableRowClassName({row}) {
                //如果收益少于50就标红
                if (row.profit < 100) {
                    return "loss-row"
                }
                //收益大于100就标绿
                if (row.profit > 200) {
                    return "earn-row"
                }
                return ""
            },

            handleEdit(row) {
                console.log(row);
                this.$confirm("确认修改？", "提示", {
                    confirmButtonText: "确认修改",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$router.push({path: "/dashboard/editOrder", params: {orderId: row.orderId}});
                    })
                    .catch(e => {
                        console.error(e);
                    })
            },
            handleDelete(row) {
                this.$confirm("确定删除?", "提示", {
                    confirmButtonText: "确认删除",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        order.deleteOrder("/api/deleteOrder", {orderId: row.orderId});
                        window.location.reload();
                    })
                    .catch((e) => {
                        console.error(e)
                    })
            },
            async changePage(currentPage) {
                this.currentPage = currentPage;
                await this.axios.post("/api/getOrder", {page: currentPage})
                    .then(response => {
                        this.orderList = response.data.orderList;
                        console.log("表格信息加载完毕！");
                    })
                    .catch(e => {
                        this.$message.error("获取订单信息失败！");
                        console.error(e);
                    });
            }
        },
        async mounted() {
            await this.axios.post("/api/getOrder", {page: 1})
                .then(response => {
                    this.orderList = response.data.orderList;
                    this.total = response.data.total;
                    console.log("表格信息加载完毕！");
                })
                .catch(e => {
                    this.$message.error("获取订单信息失败！");
                    console.error(e);
                });
        }
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