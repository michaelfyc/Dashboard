import axios from "axios"
import {Message} from "element-ui";
import router from "../routes"

const stock = {
    /**
     * 商品入库
     * @param api
     * @param data
     * @returns {Promise<void>}
     */
    async postStock(api, data) {
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
     *
     */
    async editStock(api, data) {
        await axios.put(api, data)
            .then(response => {
                if (response.data.status === "success") {
                    Message.success("修改库存成功");
                    router.push("/dashboard/stockList");
                }
            })
            .catch(e => {
                console.error(e);
                if (e.response.status === 502) {
                    Message.error(e.response.data.reason);
                } else {
                    Message.error("系统错误！");
                }

            })
    }
};

export default stock;