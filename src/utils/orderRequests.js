import axios from "axios"
import {Message} from "element-ui";

const order = {
    /**
     * 新建订单
     * @param api
     * @param data
     * @returns {Promise<void>}
     */
    async postOrder(api, data) {
        await axios.post(api, data)
            .then((response) => {
                if (response.data.status === "success") {
                    Message.success("新建订单成功！");
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
                Message.error("新建订单失败！");
            })
    },

    /**
     *
     * @param api
     * @param data
     * @returns {Promise<void>}
     */
    async deleteOrder(api, data) {
        await axios.delete(api, {data: data})
            .then(response => {
                if (response.data.status === "success") {
                    Message.success("删除订单成功！");
                }
            })
            .catch(e => {
                console.error(e);
                Message.error("删除订单失败");
            })
    }

};

export default order;