<template>
    <el-form label-width="80px" label-position="top" v-model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" width="80%"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" width="80%"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleLogin('loginForm')">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            handleLogin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //submit
                    } else {
                        console.log('error');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>