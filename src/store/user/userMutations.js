const mutations = {
    //登录时设置状态
    setUser(state, id, isLogin) {
        state.user.id = id;
        state.user.isLogin = isLogin;
    },

    //修改个人信息后更新user状态
    updateUser(state, user) {
        state.user.user.username = user.username;
        state.user.user.password = user.password;
        state.user.user.email = user.email;
        state.user.user.isLogin = true;
    },

    //登出时将user置空
    logout(state) {
        state.user = {};
    }
};

export default mutations;