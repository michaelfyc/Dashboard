const mutations = {
    addOrder(state, order) {
        state.order.orderList.unshift(order);
        state.order.orderNum++;
    },
    removeOrder(state, orderId) {
        state.order.orderList.delete(orderId);
        state.order.orderNum--;
    }
};

export default mutations;