import Cookies from "js-cookie"

const mutations = {
    /**
     * 登录
     * @param state
     * @param payload
     */
    login(state, payload) {
        state.user.uid = payload.uid;
        state.user.isLogin = true;
        if (payload.rememberMe) {
            Cookies.set("user", {uid: state.user.uid, isLogin: true}, {expires: 7});
        } else {
            sessionStorage.setItem("user", JSON.stringify({uid: state.user.uid, isLogin: true}));
        }
    },

    /**
     * 修改用户信息
     * @param state
     * @param user
     */
    updateUser(state, user) {
        state.user.user.username = user.username;
        state.user.user.password = user.password;
        state.user.user.email = user.email;
        state.user.user.isLogin = true;
    },

    /**
     * 登出后清空cookie和sessionStorage
     * @param state
     */
    logout(state) {
        state.user = {};
        sessionStorage.removeItem("user");
        Cookies.remove("user");
    },

    doNothing(state) {
        console.log(state.user.isLogin);
    }
};

export default mutations;