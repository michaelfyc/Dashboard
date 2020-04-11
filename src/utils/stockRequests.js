import axios from "axios"
import {Message} from "element-ui";

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
    }
};

export default stock;