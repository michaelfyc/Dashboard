const mutations = {
    //登录时设置状态
    setUser(state, user) {
        state.user.id = user.id;
        state.user.username = user.username;
        state.user.password = user.password;
        state.user.email = user.email;
        state.user.login = user.login;
    },

    //修改个人信息后更新user状态
    updateUser(state, user) {
        state.user.username = user.username;
        state.user.password = user.password;
        state.user.email = user.email;
        state.user.login = true;
        sessionStorage.setItem('user_id', JSON.stringify(state.user));
    },

    //登出时将user置空
    logout(state) {
        state.user = {};
    }
};

export default mutations;