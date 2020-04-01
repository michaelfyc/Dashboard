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
     * 登出后清空cookie和sessionStorage
     * @param state
     */
    logout(state) {
        state.user = {};
        sessionStorage.removeItem("user");
        Cookies.remove("user");
    }
};

export default mutations;