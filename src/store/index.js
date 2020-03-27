import Vue from 'vue'
import Vuex from 'vuex'
import order from "./order/order"
import user from "./user/user"
import createPersistedState from 'vuex-persistedstate'
import Cookies from "js-cookie"

Vue.use(Vuex);

const getters = {};

export default new Vuex.Store({
    modules: {
        order,
        user
    },
    getters,
    plugins: [createPersistedState({
        paths: ["order.order", "user.user"],
        storage: {
            getItem: (key) => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, {secure: true}),
            removeItem: key => Cookies.remove(key)
        }
    })]
})
