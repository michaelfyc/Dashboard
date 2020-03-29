<template>
    <el-form label-width="80px" label-position="top" :model="loginForm" :rules="rules" ref="loginForm"
             v-loading="loading">
        <el-form-item label="用户名/邮箱" prop="username">
            <el-input v-model="loginForm.username" class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" class="input_width" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="rememberMe">七天免登录</el-checkbox>
        </el-form-item>
        <el-row type="flex" justify="space-between">
            <el-col :span="12">
                <el-form-item>
                    <el-button type="primary" @click.prevent="handleLogin('loginForm')">登录</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="12" :push="3">
                <el-form-item>
                    <el-link type="primary" href="#/register">没有账号？去注册</el-link>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                rememberMe: false,
                loginForm: {
                    username: '',
                    password: '',
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
                        this.loading = true;
                        this.$store.dispatch("login", {data: this.loginForm, rememberMe: this.rememberMe})
                            .catch(e => console.log(e));
                        this.loading = false;
                        return true;
                    }
                    return false;
                });
            }
        }
    }
</script>

<style scoped>
    .input_width {
        width: 100%;
    }
</style>