const mutations = {
    /**
     * 新增订单
     * @param state
     * @param order
     */
    addOrder(state, order) {
        state.order.orderList.unshift(order);
        state.order.orderNum++;
    },

    /**
     * 获取订单列表
     * @param state
     * @param orderList
     */
    getOrders(state, orderList) {
        state.order.orderList = orderList;
        state.order.orderNum = orderList.length;
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