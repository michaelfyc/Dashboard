<template>
    <div>
        <span style="color:red">&ast;请不要勾选选择框，单击所需行即可选择</span>
        <el-table :data="stockList" border style="width: 100%" highlight-current-row @current-change="handleSelect">
            <el-table-column>
                <template slot-scope="props">
                    <el-checkbox v-model="props.row.checked"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="stockId" label="库存ID" v-if="false"></el-table-column>
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
                        <el-form-item label="备注" v-show="hasNote(props.row)">
                            <span v-text="props.row.note"></span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="dateTime" label="入库日期" width="160" sortable></el-table-column>
            <el-table-column prop="productName" label="产品名" width="150"></el-table-column>
            <el-table-column prop="productType[0]" label="产品类型" :formatter="translateType" :filters="typeFilter"
                             :filter-method="filterType"></el-table-column>
            <el-table-column prop="price" label="单价" sortable></el-table-column>
            <el-table-column prop="num" label="数量" sortable></el-table-column>
            <el-table-column prop="total" label="总额" sortable></el-table-column>
            <el-table-column prop="creator" label="进货人"></el-table-column>
            <el-table-column prop="contact" label="联系方式" width="150"></el-table-column>
            <el-table-column prop="platform" label="进货平台"></el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next,jumper" :page-size="50" :total="total"
                       :current-page.sync="currentPage" @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "SelectableStockList",
        data() {
            return {
                stockList: [],
                currentPage: 1,
                selectedRow: {},
                total: 0,
                typeFilter: [
                    {text: "手机", value: "Phone"},
                    {text: "平板电脑", value: "Pad"},
                    {text: "电脑", value: "Computer"},
                    {text: "配件", value: "Accessories"},
                    {text: "耳机", value: "EarPhone"},
                    {text: "其他", value: "Other"},
                ]
            }
        },
        methods: {
            async getStockList() {
                await this.axios.post("/api/getStocks", {page: 1})
                    .then(response => {
                        let stockList = response.data.stockList;
                        stockList.forEach(item => {
                            item.checked = false;
                        });
                        this.stockList = stockList;
                        console.log("库存列表加载完成！");
                    })
                    .catch(e => {
                        console.error(e);
                        this.$message.error("加载库存列表失败！");
                    })
            },

            async changePage(currentPage) {
                this.currentPage = currentPage;
                await this.axios.post("/api/getStocks", {page: currentPage})
                    .then(response => {
                        this.stockList = response.data.stockList;
                        console.log("表格信息加载完毕！");
                    })
                    .catch(e => {
                        this.$message.error("获取库存信息失败！");
                        console.error(e);
                    });
            },

            filterType(value, row) {
                return row.productType[0] === value;
            },

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

            handleSelect(currentRow, oldCurrentRow) {
                if (oldCurrentRow === null) {
                    currentRow.checked = true;
                    this.$emit("transferSelectedRow", currentRow);
                }
                this.stockList.forEach(item => {
                    if (currentRow.stockId === item.stockId) {
                        currentRow.checked = true;
                        oldCurrentRow.checked = false;
                        this.$emit("transferSelectedRow", currentRow);
                    }
                })
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
        },

        mounted() {
            this.getStockList();
        }

    }
</script>

<style scoped>
</style>