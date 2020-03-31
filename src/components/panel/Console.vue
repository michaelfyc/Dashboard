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
                    title: {text: "最近7天订单统计表"},
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
                    title: {text: "本月订单统计表"},
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
                await this.axios.get("/api/getWeekGraph").then(response => {
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
                await this.axios.get("/api/getMonthGraph")
                    .then(response => {
                        this.monthData.series[0].data = response.data.sales;
                        this.monthData.series[1].data = response.data.profit;
                        this.monthData.xAxis[0].data = this.getMonthDays(response.data.day);
                    }).catch(e => {
                        console.error(e);
                    });
                this.loading = false;
            },

            /**
             * 获取最近七天
             */
            getSevenDays() {
                let dayMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                let today = new Date();
                let result = [today.getUTCDay()];
                for (let i = 0; i < 6; i++) {
                    today.setUTCDate(today.getUTCDate() - 1);
                    result.unshift(today.getUTCDay());
                }
                return result.map(element => {
                    return dayMap[element];
                });
            },

            /**
             * 获取这个月的日期
             */
            getMonthDays(days) {
                let today = new Date();
                let result = [(today.getUTCMonth() + 1) + "/" + today.getUTCDate()];
                for (let i = 0; i < days - 1; i++) {
                    today.setUTCDate(today.getUTCDate() - 1);
                    result.unshift((today.getUTCMonth() + 1) + "/" + today.getUTCDate())
                }
                return result;
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