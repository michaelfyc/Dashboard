import axios from "axios"
import {Message} from "element-ui";

const item = {
    /**
     * 商品入库
     * @param api
     * @param data
     * @returns {Promise<void>}
     */
    async postItem(api, data) {
        await axios.post(api, data)
            .then(response => {
                if (response.data.status === "success") {
                    Message.success("商品已入库！");
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
                Message.error("入库失败！");
            })
    },

    /**
     * 删除库存
     * @param api
     * @param data
     * @returns {Promise<void>}
     */
    async deleteItem(api, data) {
        await axios.delete(api, data)
            .then(response => {
                if (response.data.status === "success") {
                    Message.success("删除库存成功！");
                }
            })
            .catch(e => {
                console.error(e);
                Message.error("删除订单失败！");
            })
    }
};

export default item;