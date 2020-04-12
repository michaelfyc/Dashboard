<template>
    <div>
        <el-form inline class="stock-overview">
            <el-form-item label="库存总量:"><span v-text="num"></span></el-form-item>
            <el-form-item label="库存总进价:"><span>{{total+"（元）"}}</span></el-form-item>
        </el-form>
        <v-chart :options="stockData"></v-chart>
    </div>
</template>

<script>
    import Vue from "vue"
    import 'echarts/lib/component/toolbox'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/title'
    import 'echarts/lib/chart/bar'
    import Echarts from "vue-echarts"

    Vue.component("v-chart", Echarts);

    export default {
        name: "StockGraph",
        data() {
            return {
                stockData: {
                    title: {text: "库存"},
                    legend: {show: true, data: ["库存", "金额"]},
                    xAxis: [{type: 'category', data: [], axisTick: {alignWithLabel: true}}],
                    yAxis: [{
                        type: 'value',
                        name: '库存数量',
                        min: 0,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        nameLocation: 'center',
                        nameGap: 65
                    },
                        {
                            type: 'value',
                            name: '金额/CYN',
                            axisLabel: {
                                formatter: '{value}'
                            },
                            nameLocation: 'center',
                            nameGap: 65,
                            nameRotate: -90
                        }],
                    toolbox: {
                        show: true,
                        top: -6,
                        feature: {
                            saveAsImage: {show: true},
                            restore: {show: true}
                        }
                    },
                    series: [
                        {
                            name: "库存",
                            type: "bar",
                            barGap: 0,
                            label: {show: true, position: "insideTop"},
                            data: []
                        },
                        {
                            name: "金额",
                            type: "bar",
                            yAxisIndex: 1,
                            barGap: 0,
                            label: {show: true, position: "insideTop"},
                            data: []
                        }
                    ]
                },
                num: 0,
                total: 0
            }
        },
        methods: {
            async getStockData() {
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
                await this.axios.get("/api/stock")
                    .then(response => {
                        this.stockData.xAxis[0].data = response.data.types.map(value => {
                            return typeMap[value]
                        });
                        this.stockData.series[0].data = response.data.num;
                        this.stockData.series[1].data = response.data.total;
                        this.num = response.data.overview.num;
                        this.total = response.data.overview.total;
                        console.log("库存图表加载成功！");
                    })
                    .catch(e => {
                        console.error(e);
                        this.$message.error("获取库存信息失败！");
                    })
            }
        },
        mounted() {
            this.getStockData();
        }
    }
</script>

<style>
    .echarts {
        width: 100%
    }

    .stock-overview label {
        width: 90px;
        color: #99a9bf;
    }
</style>