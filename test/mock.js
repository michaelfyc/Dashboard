import Mock from 'mockjs'

Mock.setup({
    timeout: '200-600'
});
Mock.mock("/API/user", {
    statusCode: "200", user: {
        id: "12343",
        username: "admin",
        email: "a@qq.com",
        password: "123456",
        login: true
    }
});


Mock.mock("/API/register", {
    statusCode: "200",
    verified: true
});

Mock.mock("/API/putUserNoPwd", {
    statusCode: "200",
    verified: true,
    message: "修改成功"
});

Mock.mock("/API/putUserPwd", {
    statusCode: "200",
    verified: true,
    message: "修改成功"
});

Mock.mock("/API/postOrderData", {
    statusCode: "200",
    verified: true,
    xAxisData: ["1月", "2月", "3月", "4月"],
    series: [
        {type: "bar", data: [15, 3, 6, 27], barWidth: "60%"},
    ]
});

Mock.mock("/API/postOrder", {
    statusCode: "200"
});