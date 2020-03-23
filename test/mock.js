import Mock from 'mockjs'

Mock.setup({
    timeout: '200-600'
});
Mock.mock("/API/login", {
    uid: "1",
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

Mock.mock("/API/postOrderData", {
    verified: true,
    xAxisData: ["1月", "2月", "3月", "4月"],
    series: [
        {type: "bar", data: [15, 3, 6, 27], barWidth: "60%"},
    ]
});

Mock.mock("/API/postOrder", {
    statusCode: "200"
});