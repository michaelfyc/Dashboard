import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from "./actions"

Vue.use(Vuex);

const state = {
    user: {},
    order: {
        orderNum: 0,
        orderList: []
    }
};

const getters = {};

export default new Vuex.Store({
    actions,
    state,
    mutations,
    getters
})
