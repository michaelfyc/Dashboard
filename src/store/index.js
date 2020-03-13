import Vue from 'vue'
import Vuex from 'vuex'
import order from "./order/order"
import user from "./user/user"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const getters = {};

export default new Vuex.Store({
    modules: {
        order,
        user
    },
    getters,
    plugins: [createPersistedState()]//TODO some should get from session/cookie
})
