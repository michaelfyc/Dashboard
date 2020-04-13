<template>
    <div>
        <el-form inline class="fund-overview">
            <el-form-item label="库存总金额:"><span v-text="fundData.series[0].data[0].value"></span>（元）</el-form-item>
            <el-form-item label="销售总金额:"><span v-text="this.fundData.series[0].data[1].value"></span>（元）</el-form-item>
        </el-form>
        <v-chart :options="fundData" v-loading="loading"></v-chart>
    </div>
</template>

<script>
    import Vue from "vue"
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/toolbox'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/title'
    import Echarts from 'vue-echarts'

    Vue.component('v-chart', Echarts);

    export default {
        name: "FundGraph",
        data() {
            return {
                loading: false,
                fundData: {
                    title: {text: "资金"},
                    legend: {
                        bottom: 5,
                        orient: "vertical",
                        left: 10,
                        data: ["库存总金额", "销售总金额", "已售产品售价", "已售产品邮费", "总盈利"]
                    },
                    toolbox: {
                        show: true,
                        top: -6,
                        feature: {
                            saveAsImage: {show: true},
                            restore: {show: true}
                        }
                    },
                    series: [{
                        type: "pie",
                        radius: [0, "60%"],
                        label: {position: 'inner', formatter: '{b}:{c}元({d}%)'},
                        data: [{value: 0, name: "库存总金额"}, {value: 0, name: "销售总金额"}]
                    },
                        {
                            type: "pie",
                            radius: ["70%", "85%"],
                            label: {position: "outside", formatter: '{b}:{c}元({d}%)'},
                            data: [
                                {value: 0, name: "库存总金额"},
                                {value: 0, name: "已售产品售价"},
                                {value: 0, name: "已售产品邮费"},
                                {value: 0, name: "总盈利"}
                            ]
                        }]
                }
            }
        },

        methods: {
            async getFundData() {
                await this.axios.get("/api/money")
                    .then(response => {
                        this.fundData.series[0].data[0].value = response.data.stockMoney;
                        this.fundData.series[0].data[1].value = response.data.orderSold;
                        this.fundData.series[1].data[0].value = response.data.stockMoney;
                        this.fundData.series[1].data[1].value = response.data.orderPurchase;
                        this.fundData.series[1].data[2].value = response.data.orderPost;
                        this.fundData.series[1].data[3].value = response.data.orderProfit;
                    })
                    .catch(e => {
                        console.error(e);
                        this.$message.error("资金图表加载失败！");
                    });
            }
        },

        mounted() {
            this.loading = true;
            this.getFundData();
            this.loading = false;
        }
    }
</script>

<style>
    .echarts {
        width: 100%
    }

    .fund-overview label {
        width: 90px;
        color: #99a9bf;
    }
</style>