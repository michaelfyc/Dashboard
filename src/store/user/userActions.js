import axios from 'axios'
import {Message} from "element-ui"
import router from "../../routes"

const actions = {
    /**
     * 登录
     * @param commit
     * @param payload
     * @returns {Promise<void>}
     */
    async login({commit}, payload) {
        await axios.post("/api/login", payload.data)
            .then(response => {
                commit("login", {uid: response.data.uid, rememberMe: payload.rememberMe});
                Message.success("登录成功!");
                router.push({path: "/dashboard"});
            })
            .catch(e => {
                if (e.response.status === 403) {
                    Message.error("用户名或密码错误！");
                } else {
                    Message.error("系统错误！");
                    console.error(e);
                }
            })
    },


    /**
     * 注册
     * @param commit
     * @param data
     * @returns {Promise<void>}
     */
    async register({commit}, data) {
        //Just to make sure register is async...
        commit("doNothing");
        await axios.post("/api/register", data)
            .then(response => {
                if (response.data.verified === true) {
                    Message.success("注册成功！");
                    router.push("/");
                } else {
                    Message.error(response.data.reason);
                }
            })
            .catch(e => {
                Message.error("系统错误");
                console.error(e);
            })
    }
};

export default actions;
