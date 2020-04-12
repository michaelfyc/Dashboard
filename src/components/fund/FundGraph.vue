<template>
    <div>
        <v-chart :options="fundData"></v-chart>
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
                fundData: {
                    title: {text: "资金"},
                    legend: {show: true, data: ["库存总金额", "销售总金额", "已售产品售价", "已售产品邮费", "总盈利"]},
                    toolbox: {
                        show: true,
                        top: -6,
                        feature: {
                            saveAsImage: {show: true},
                            restore: {show: true}
                        }
                    },
                    tooltip: {trigger: 'item', formatter: '{b}:{c}({d}%)'},
                    series: [{
                        name: "",
                        type: "pie",
                        radius: [0, "30%"],
                        label: {position: 'inner'},
                        data: [{value: 1000, name: "库存总金额"}, {value: 2000, name: "销售总金额"}]
                    },
                        {
                            name: "",
                            type: "pie",
                            radius: ["40%", "55%"],
                            label: {position: "outside"},
                            data: [{value: 1000, name: "库存总金额"}, {value: 1500, name: "已售产品售价"}, {
                                value: 200,
                                name: "已售产品邮费"
                            }, {value: 300, name: "总盈利"}]
                        }]
                }
            }
        },

        methods: {},

        mounted() {

        }
    }
</script>

<style>
    .echarts {
        width: 100%
    }
</style>