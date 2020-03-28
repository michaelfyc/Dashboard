const mutations = {
    /**
     * 新增订单
     * @param state
     */
    addOrder(state) {
        console.log(state.order.orderNum)
    },

    /**
     * 获取订单列表
     * @param state
     * @param data
     */
    getOrders(state, data) {
        state.order.orderList = data.orderList;
        state.order.orderNum = data.orderNum;
    },

    /**
     * 删除订单？
     * @param state
     * @param orderId
     */
    removeOrder(state, orderId) {
        state.order.orderList.delete(orderId);
        state.order.orderNum--;
    }
};

export default mutations;