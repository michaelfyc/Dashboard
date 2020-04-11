import Mock from 'mockjs'

Mock.setup({
    timeout: '200-600'
});
Mock.mock("/API/login", {
    uid: "1",
    username: "admin",
    isLogin: true
});

Mock.mock("/api/getStock", {
    stockList: [
        {
            "contact": "182****9597",
            "creator": "张三",
            "dateTime": "2020-03-27 02:38:47",
            "num": 20,
            "platform": "vx",
            "price": 1000,
            "productDescription": {
                "color": "silver",
                "outlook": "全新"
            },
            "productName": "iPhone",
            "productType": [
                "Phone",
                "Apple"
            ],
            "stockId": 1,
            "sum": 20000
        }
    ],
    total: 1
});

Mock.mock("/api/stock", {
    types: ["Phone", "Pad", "Other"],
    num: [10, 20, 3],
    total: [1000, 2000, 30],
    overview: {
        num: 33,
        total: 3030
    }
});

Mock.mock("/api/addStock", {
    status: "success"
});

Mock.mock("/API/logout",{});


Mock.mock("/API/register", {
    verified: true
});

Mock.mock("/API/getUserInfo", {
    username: "admin",
    email: "example@example.com",
    password: "123456"
});

Mock.mock("/API/editInfo", {
    verified: true
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

Mock.mock("/API/getWeekGraph", {
    sales: [15, 3, 6, 27, 2, 5, 0],
    profit: [2000, 150, 289, -40, 1500, 200, 0],
});

Mock.mock("/API/getMonthGraph", {
    day: 31,
    sales: [15, 3, 6, 27, 2, 5, 0, 12, 13, 5, 1, 4],
    profit: [2000, 150, 289, -40, 1500, 200, 0, 130, 423, 23, -33, 1320]
});