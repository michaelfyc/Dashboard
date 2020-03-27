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
        await axios.post("/api/AddOrder", data)
            .then((response) => {
                if (response.data.status === "success") {
                    //Not doing anything atc all..Just to make sure the function is async
                    commit("addOrder");
                    Message.success("新建订单成功！");
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
                Message.error("新建订单失败！");
            });
    },

    /**
     *
     * 获取订单列表
     * @param commit
     */
    async getOrderList({commit}) {
        await axios.post("/API/getOrderList")
            .then(response => {
                commit("getOrders", response.data.orderList);//TODO 后端叫啥还没决定，分页也没做..
                console.log("表格信息加载完毕！");
            })
            .catch(e => {
                Message.error("获取订单信息失败！");
                console.error(e);
            })
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