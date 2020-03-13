const mutations = {
    addOrder(state, order) {
        state.order.orderList.unshift(order);
        state.order.orderNum++;
    },
    removeOrder(state, order) {
        console.log(state);
        console.log(order);
    }
};

export default mutations;