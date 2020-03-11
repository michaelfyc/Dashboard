<template>
    <el-form label-width="80px" label-position="top" :model="loginForm" :rules="rules" ref="loginForm"
             v-loading="loading">
        <el-form-item label="用户名/邮箱" prop="username">
            <el-input v-model="loginForm.username" class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" class="input_width"></el-input>
        </el-form-item>
        <el-row type="flex" justify="space-between">
            <el-col :span="12">
                <el-form-item>
                    <el-button type="primary" @click.prevent="handleLogin('loginForm')">登录</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="12" :push="8">
                <el-form-item>
                    <el-button type="success" @click.prevent="jumpToRegister">注册</el-button>
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
            login() {
                this.axios.post('/API/user').then((response) => {
                    //登录成功
                    if (response.data.statusCode === "200") {
                        this.$store.commit("setUser", response.data.user);
                        sessionStorage.setItem('user_id', JSON.stringify(response.data.user));
                        this.$router.push('/dashboard')
                            .catch(e => {
                                console.error(e)
                            });
                    }
                    //登陆失败
                    else {
                        this.$message.error("用户名或密码错误！");
                    }
                }).catch((e) => {
                    console.error(e);
                    this.$message.error("系统错误!");
                });
            },

            handleLogin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.login();
                        this.loading = false;
                        return true;
                    }
                    return false;
                });
            },

            jumpToRegister() {
                this.$router.push({path: "/register"}).catch(error => console.error(error));
            }
        }
    }
</script>

<style scoped>
    .input_width {
        width: 100%;
    }
</style>