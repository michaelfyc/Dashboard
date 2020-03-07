import Mock from 'mockjs'

Mock.mock("/API/user", {
    statusCode: "200", user: {
        id: "12343",
        username: "admin",
        email: "a@qq.com",
        password: "123456"
    }
});

Mock.mock("/API/putUserNoPwd", {
    statusCode: "200",
    verified: "true",
    message: "修改成功"
});

Mock.mock("/API/putUserPwd", {
    statusCode: "200",
    verified: "true",
    message: "修改成功"
});