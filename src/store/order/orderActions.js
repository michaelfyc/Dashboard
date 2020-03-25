import axios from 'axios'
import {Message} from 'element-ui'

const actions = {
    /**
     * 新建订单
     * @param commit
     * @param data
     * @returns {Promise<void>}
     */
    async postOrder({commit}, data) {
        await axios.post("/API/postOrder", data)
            .then((response) => {
                if (response.data.status === "OK") {
                    //commit加数
                    commit("addOrder", data.order);
                    Message.success("新建订单成功！");
                    window.location.reload();
                } else if (response.data.status === "Error") {
                    Message.error("新建订单失败！")
                }
            })
            .catch((error) => {
                console.error(error);
                Message.error("新建订单失败！");
            });
    },

    /**
     * 删除订单
     * @param commit
     * @param orderId
     * @param orderForm
     * @returns {Promise<void>}
     */
    async deleteOrder({commit}, orderId) {
        await axios.delete("/API/deleteOrder", orderId)
            .then((response) => {
                //如果成功删除
                if (response.data.verified === true) {
                    //commit
                    commit("removeOrder", orderId);
                    Message.success("删除成功！");
                }
            })
            .catch(error => {
                Message.error("删除失败！");
                console.error(error);
            })
    }
};

export default actions;