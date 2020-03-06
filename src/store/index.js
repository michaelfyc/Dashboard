import Vuex from 'vuex'

const state = {
    username: '',
    password: '',
    email: ''
};

const mutations = {
    update(state, payload) {
        state.username = payload.username;
        state.email = payload.email;
        state.password = payload.password;
    }
};

const actions = {};

const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
});

export default store;
