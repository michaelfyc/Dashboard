import axios from 'axios'
import {Message} from 'element-ui'

const actions = {
    /**
     * 新建订单
     * @param commit
     * @param orderForm
     * @returns {Promise<void>}
     */
    async postOrder({commit}, orderForm) {
        await axios.post("/API/postOrder", orderForm)
            .then((response) => {
                if (response.data.status === "OK") {
                    //commit加数
                    commit("addOrder", orderForm);
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
     * @param orderForm
     * @returns {Promise<void>}
     */
    async deleteOrder({commit}, orderForm) {
        await axios.delete("/API/deleteOrder", orderForm.productName)
            .then((response) => {
                //如果成功删除
                if (response.status === 200 && response.data.verified === true) {
                    //commit
                    commit("removeOrder", orderForm.productName);
                    Message.success("删除成功！");
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
};

export default actions;