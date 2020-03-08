import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    user: {}
};

const actions = {};

const getters = {};

export default new Vuex.Store({
    actions,
    state,
    mutations,
    getters
})
