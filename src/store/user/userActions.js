import axios from 'axios'
import {Message} from "element-ui"
import router from "../../routes"

const actions = {
    /**
     * 登录
     * @param commit
     * @param data
     * @returns {Promise<void>}
     */
    async login({commit}, data) {
        await axios.post("/API/login", data)
            .then(response => {
                if (response.status === 200 && response.data.verified === true) {
                    commit("setUser", response.data.user);
                    Message.success("登录成功!");
                    router.push({path: "/dashboard"});
                } else {
                    Message.error(response.data.message);
                }
            })
            .catch(e => {
                Message.error("系统错误！");
                console.error(e);
            })
    },


    /**
     * 注册
     * @param data
     * @returns {Promise<void>}
     */
    async register(data) {
        await axios.post("/API/register", data)
            .then(response => {
                if (response.status === 200 && response.data.verified === true) {
                    Message.success("注册成功！");
                    this.$router.push({path: "/login"});
                } else {
                    Message.error(response.data.message);
                }
            })
            .catch(e => {
                Message.error("系统错误");
                console.error(e);
            })
    },

    /**
     * 修改用户信息（但不修改密码)
     * @param commit
     * @param data
     * @returns {Promise<void>}
     */
    async putUserNoPwd({commit}, data) {
        await axios.put("/API/putUserNoPwd", data)
            .then(response => {
                if (response.status === 200 && response.data.verified === true) {
                    commit("updateUser", response.data.user);//TODO 后端传什么还没决定..
                    Message.success("修改成功！");
                } else {
                    Message.error("修改失败！" + response.data.message);
                }
            })
            .catch(e => {
                Message.error("系统错误");
                console.error(e);
            })
    },

    /**
     * 修改用户信息，且修改密码
     * @param commit
     * @param data
     * @returns {Promise<void>}
     */
    async putUserWithPwd({commit}, data) {
        await axios.put("/API/putUserWithPwd", data)
            .then(response => {
                if (response.status === 200 && response.data.verified === true) {
                    commit("updateUser", response.data.user);//TODO 后端传什么还没决定..
                    Message.success("修改成功！");
                } else {
                    Message.error("修改失败！" + response.data.message);
                }
            }).catch(e => {
                Message.error("系统错误");
                console.error(e);
            });

    }
};

export default actions;
