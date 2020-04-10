<template>
    <div>
        <v-chart></v-chart>
    </div>
</template>

<script>
    import Vue from "vue"
    import 'echarts/lib/component/toolbox'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/title'
    import Echarts from 'vue-echarts'

    Vue.component('v-chart', Echarts);

    export default {
        name: "FundGraph"
    }
</script>

<style scoped>

</style>