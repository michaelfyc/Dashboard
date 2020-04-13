<template>
    <div>
        <el-table :data="fundTable" border style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="type" label="支出/收入" v-if="false"></el-table-column>
            <el-table-column prop="dateTime" label="日期" width="160px" sortable></el-table-column>
            <el-table-column prop="productName" label="产品名称" min-width="150px"></el-table-column>
            <el-table-column prop="productType" label="产品类型" :formatter="translateType" :filters="typeFilter"
                             :filter-method="filterType"></el-table-column>
            <el-table-column prop="money" label="金额" :formatter="moneyFormatter" sortable></el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next,jumper" :page-size="50" :total="total"
                       :current-page.sync="currentPage" @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Flow",
        data() {
            return {
                currentPage: 1,
                total: 0,
                fundTable: [],
                typeFilter: [
                    {text: "手机", value: "Phone"},
                    {text: "平板电脑", value: "Pad"},
                    {text: "电脑", value: "Computer"},
                    {text: "配件", value: "Accessories"},
                    {text: "耳机", value: "EarPhones"},
                    {text: "其他", value: "Other"},
                ]
            }
        },
        methods: {
            changePage(currentPage) {
                this.currentPage = currentPage;
                this.getFlowData(this.currentPage);
            },

            async getFlowData(page) {
                await this.axios.post("/api/moneyDetail", {page: page})
                    .then(response => {
                        this.total = response.data.num;
                        this.fundTable = response.data.moneyDetail;
                        console.log("流水加载成功");
                    })
                    .catch(e => {
                        console.error(e);
                        this.$message.error("流水明细加载失败！");
                    })
            },

            filterType(value, row) {
                return row.productType[0] === value;
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
                    "Wireless": "无线",
                    "Pen": "手写笔",
                    "Charger": "充电器",
                    "Mouse": "鼠标",
                    "KeyBoard": "键盘"
                };
                if (row.productType.length === 1) {
                    return typeMap[row.productType[0]]
                }
                if (row.productType.length === 2) {
                    return typeMap[row.productType[1]] + typeMap[row.productType[0]]
                }
                return typeMap[row.productType[1]] + typeMap[row.productType[2]] + typeMap[row.productType[0]];
            },

            moneyFormatter(row) {
                return row.type === "in" ? row.money : 0 - row.money;
            },

            tableRowClassName({row}) {
                if (row.type === "in") {
                    return "earn-row"
                } else {
                    return "loss-row"
                }
            }
        },

        mounted() {
            this.getFlowData(1);
        }
    }
</script>

<style scoped>
    .el-table .loss-row {
        background: #fef0f0;
    }

    .el-table .earn-row {
        background: #f0f9eb;
    }
</style>