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
                if (response.data.statusCode === "200") {
                    //commit加数
                    commit("addOrderNum");
                    Message.success("新建订单成功！");
                    window.location.reload();//TODO 会把state刷新掉..resetFields也没法清空外组件的值
                } else {
                    Message.error("新建订单失败");
                }
            })
            .catch((error) => {
                console.error(error);
                this.$message.error("系统错误");
            });
    },


};

export default actions;