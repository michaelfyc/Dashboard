import actions from "./orderActions"
import mutations from "./orderMutations"

const state = {
    order: {
        orderList: [],
        orderNum: 0
    }
};

export default {
    state,
    actions,
    mutations
}