import Vue from 'vue'
import Vuex from 'vuex'
import actions from './userActions'
import mutations from './userMutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const state = {
    user: {}
};

const getters = {};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})
