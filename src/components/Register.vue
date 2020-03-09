<template>
    <el-form label-width="80px" :model="regForm" ref="regForm" :rules="regRules" v-loading="loading">
        <el-form-item label="用户名" prop="username">
            <el-input style="width:50%" v-model="regForm.username" class="narrow_input"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="regForm.email" class="narrow_input"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="regForm.password" class="narrow_input" minlength="6" maxlength="26"
                      show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="vpassword">
            <el-input type="password" v-model="regForm.vpassword" class="narrow_input" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleReg('regForm')">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Register",
        data() {
            const validPwd = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请输入密码！"));
                } else if (value.length < 6 || value.length > 26) {
                    callback(new Error("密码长度应该在6-26位之间"));
                } else {
                    callback();
                }
            };

            const validvPwd = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请输入确认密码！"));
                }
                if (value !== this.regForm.password) {
                    callback(new Error("两次输入密码不一致！"));
                } else {
                    callback();
                }
            };

            return {
                loading: false,
                regForm: {
                    username: '',
                    email: '',
                    password: '',
                    vpassword: ''
                },
                regRules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: "请输入邮箱", trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: 'blur'},
                        {validator: validPwd, trigger: 'blur'}
                    ],
                    vpassword: [
                        {required: true, message: "请输入确认密码", trigger: 'blur'},
                        {validator: validvPwd, trigger: 'blur'}
                    ]
                },
            }
        },

        methods: {
            register() {
                let data = {
                    username: this.regForm.username,
                    email: this.regForm.email,
                    password: this.regForm.password
                };
                this.axios.post("/API/register", data).then(response => {
                    if (response.data.statusCode === "200" && response.data.verified === true) {
                        this.$message.success("注册成功！");
                        this.$router.push({path: "/login"});
                    } else if (response.data.verified === false) {
                        this.$message.error("用户名或邮箱已存在");
                    } else {
                        this.$message.error("服务异常！");
                    }
                }).catch(e => {
                    console.error(e);
                })
            },


            handleReg(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.register();
                        this.loading = false;
                    } else {
                        console.warning('Register error');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .narrow_input {
        width: 80%
    }
</style>