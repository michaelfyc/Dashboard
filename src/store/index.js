import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user/user"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const getters = {};

export default new Vuex.Store({
    modules: {
        user
    },
    getters,
    plugins: [createPersistedState({
        paths: ["user.user"],
        storage: window.sessionStorage
    })]
})
