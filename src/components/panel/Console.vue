<template>
    <!--    TODO 表格和仪表盘-->
    <v-chart :options="orderBar" v-loading="loading"></v-chart>
</template>

<script>
    import Vue from 'vue'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/tooltip'
    import Echarts from 'vue-echarts'

    Vue.component('v-chart', Echarts);

    export default {
        name: "Console",
        data() {
            return {
                loading: true,

                //表格信息
                orderBar: {
                    title: {text: "订单统计表"},
                    legend: {data: []},
                    xAxis: [{type: 'category', data: [], axisTick: {alignWithLabel: true}}],
                    yAxis: [{type: 'value'}],
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {show: true},
                            magicType: {show: true, type: ['line', 'bar']}
                        }
                    },
                    series: []
                }
            }
        },

        methods: {
            postOrderData() {
                this.axios.post("/API/postOrderData", this.$store.state.user).then(response => {
                    if (response.data.statusCode === "200" && response.data.verified === true) {
                        this.loading = false;
                        this.orderBar.series = response.data.series;
                        this.orderBar.xAxis[0].data = response.data.xAxisData;
                    } else {
                        this.loading = false;
                        this.$message.error("表格获取失败！");
                    }
                }).catch(error => {
                    this.loading = false;
                    this.$message.error("表格获取失败！");
                    console.error(error);
                });
            }
        },

        mounted() {
            this.postOrderData();
        }
    }
</script>

<style scoped>

</style>