<template>
    <div>
        <div>
            <v-chart :options="weekData" v-loading="loading" autoresize></v-chart>
        </div>
        <div>
            <v-chart :options="monthData" v-loading="loading" autoresize></v-chart>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/toolbox'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/title'
    import Echarts from 'vue-echarts'

    Vue.component('v-chart', Echarts);

    export default {
        name: "Console",
        data() {
            return {
                loading: false,
                //表格信息
                weekData: {
                    title: {text: "周订单统计表"},
                    legend: {show: true, data: ['销量', '盈利额']},
                    xAxis: [{type: 'category', data: [], axisTick: {alignWithLabel: true}}],
                    yAxis: [
                        {type: 'value', name: '销量', min: 0},
                        {type: 'value', name: '盈利', axisLabel: {formatter: '{value}元'}}
                    ],
                    toolbox: {
                        show: true,
                        top: -6,
                        feature: {
                            saveAsImage: {show: true},
                            restore: {show: true}
                        }
                    },
                    series: [{
                        name: "销量",
                        type: "bar",
                        data: [],
                        barWidth: "60%",
                        label: {show: true, position: "insideTop"},
                        //颜色设置
                        itemStyle: {
                            normal: {
                                color(params) {
                                    let colorList = [
                                        '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                        {
                            name: "盈利额",
                            type: "line",
                            data: [],
                            yAxisIndex: 1,
                            label: {
                                show: true, position: "bottom",
                                formatter: function (params) {
                                    if (params.value < 0) {
                                        return "{a|" + params.value + "}"
                                    } else {
                                        return "{b|" + params.value + "}";
                                    }
                                },
                                rich: {a: {color: "#ff0000"}, b: {color: "#005c98"}}
                            }
                        }]
                },
                monthData: {
                    title: {text: "月订单统计表"},
                    legend: {data: ["销量", "盈利额"]},
                    xAxis: [{type: 'category', data: [], axisTick: {alignWithLabel: true}}],
                    yAxis: [
                        {type: 'value', name: '销量', min: 0},
                        {type: 'value', name: '盈利', axisLabel: {formatter: '{value}元'}}
                    ],
                    toolbox: {
                        top: -6,
                        feature: {
                            saveAsImage: {show: true},
                            restore: {show: true}
                        }
                    },
                    series: [{
                        name: "销量",
                        type: "bar",
                        data: [],
                        barWidth: "60%",
                        label: {show: true, position: "insideTop"},
                        //颜色设置
                        itemStyle: {
                            normal: {
                                color(params) {
                                    let colorList = [
                                        '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                        {
                            name: "盈利额",
                            type: "line",
                            data: [],
                            yAxisIndex: 1,
                            label: {
                                show: true, position: "bottom",
                                formatter: function (params) {
                                    if (params.value < 0) {
                                        return "{a|" + params.value + "}"
                                    } else {
                                        return "{b|" + params.value + "}";
                                    }
                                },
                                rich: {a: {color: "#ff0000"}, b: {color: "#005c98"}}
                            }
                        }]
                }
            }
        },

        methods: {
            postOrderData() {
                this.loading = true;
                this.getWeek();
                this.getMonth();
            },

            async getWeek() {
                await this.axios.get("/api/getOrderWeek").then(response => {
                    this.weekData.series[0].data = response.data.sales;
                    this.weekData.series[1].data = response.data.profit;
                    this.weekData.xAxis[0].data = this.getSevenDays();
                }).catch(error => {
                    this.$message.error("表格获取失败！");
                    console.error(error);
                });
                this.loading = false;
            },

            async getMonth() {
                await this.axios.get("/api/getOrderMonth")
                    .then(response => {
                        this.monthData.series[0].data = response.data.sales;
                        this.monthData.series[1].data = response.data.profit;
                        this.monthData.xAxis[0].data = this.getTwelveMonths();
                    }).catch(e => {
                        console.error(e);
                    });
                this.loading = false;
            },

            getSevenDays() {
                let dayMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                let today = new Date();
                let result = [today.getDay()];
                for (let i = 0; i < 6; i++) {
                    today.setDate(today.getDate() - 1);
                    result.unshift(today.getDay());
                }
                return result.map(element => {
                    return dayMap[element];
                });
            },

            getTwelveMonths() {
                let monthMap = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
                let today = new Date();
                let result = [];
                for (let i = 0; i < 12; i++) {
                    today.setMonth(today.getMonth() - 1);
                    result.unshift(today.getMonth());
                }
                return result.map(element => {
                    return monthMap[element];
                });
            }
        },

        mounted() {
            this.postOrderData();
        }
    }
</script>

<style scoped>
    .echarts {
        width: 100%
    }
</style>