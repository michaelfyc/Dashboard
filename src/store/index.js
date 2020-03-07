import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    user: {}
};

const mutations = {
    setUser(state, user) {
        state.user.id = user.id;
        state.user.username = user.username;
        state.user.password = user.password;
        state.user.email = user.email;
        state.user.login = true;
    },
    updateUser(state, user) {
        state.user.username = user.username;
        state.user.password = user.password;
        state.user.email = user.email;
        state.user.login = true;
        sessionStorage.setItem('user_id', JSON.stringify(state.user));
    },
    logout(state) {
        state.user = {};
    }
};

const actions = {};

const getters = {};

export default new Vuex.Store({
    actions,
    state,
    mutations,
    getters
})
