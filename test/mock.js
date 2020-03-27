import Mock from 'mockjs'

Mock.setup({
    timeout: '200-600'
});
Mock.mock("/API/login", {
    uid: "0",
    isLogin: true
});


Mock.mock("/API/register", {
    verified: true
});

//TODO 接口数据修改
Mock.mock("/API/putUserNoPwd", {
    verified: true,
    message: "修改成功"
});

//TODO 接口数据修改
Mock.mock("/API/putUserWithPwd", {
    verified: true,
    message: "修改成功"
});

Mock.mock("/API/getOrderList", {
    orderList: [{
        orderId: 12,
        submitterId: 2,
        date: "2020-3-27 10:34:22",
        productName: "戴尔xps12寸",
        productType: ["Computer", "Laptop", "Windows"],
        withAccessories: true,
        money: {"purchasePrice": 8999.01, "soldPrice": 9049, "postPrice": 30, "profit": 19.978},
        productDescription: {"color": "silver", "outlook": "非常tm新", "memory": "16G", "storage": "1024"},
        purchaser: "居家",
        contact: "7238784764",
        platform: "vx",
        note: "",
        accessories: ["Mouse", "KeyBoard"]
    },
        {
            orderId: 13,
            submitterId: 1,
            date: "2020-3-26 13:32:22",
            productName: "Ipad Pro 2018",
            productType: ["Pad"],
            withAccessories: true,
            money: {"purchasePrice": 6899, "soldPrice": 7200, "postPrice": 10, "profit": 291},
            productDescription: {"color": "silver", "outlook": "全新", "storage": "512G"},
            purchaser: "理鸭",
            contact: "23425577232",
            platform: "vx",
            note: "",
            accessories: ["Pen", "Charger"]
        }],
});

Mock.mock("/API/postOrderData", {
    verified: true,
    xAxisData: ["1月", "2月", "3月", "4月"],
    series: [
        {type: "bar", data: [15, 3, 6, 27], barWidth: "60%"},
    ]
});

Mock.mock("/API/postOrder", {
    status: "OK"
});