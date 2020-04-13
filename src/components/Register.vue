<template>
    <el-form label-width="80px" :model="regForm" ref="regForm" :rules="regRules" v-loading="loading"
             label-position="top">
        <el-form-item label="用户名" prop="username">
            <el-input style="width:100%" v-model="regForm.username" class="narrow_input"></el-input>
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
        <el-form-item label="角色">
            <el-radio-group v-model="regForm.role">
                <el-radio :label="1">管理员</el-radio>
                <el-radio :label="2">用户</el-radio>
                <el-radio :label="3">访客</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleReg('regForm')">添加新用户</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Register",
        data() {
            const validName = (rule, value, callback) => {
                if (!value.match(/^[a-zA-Z\u4E00-\u9FA5]{2,16}$/)) {
                    callback(new Error("用户名非法！"));
                } else {
                    callback();
                }
            };

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
                    vpassword: '',
                    role: 2
                },
                regRules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: 'blur'},
                        {validator: validName, trigger: 'blur'}
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
                    password: this.regForm.password,
                    role: this.regForm.role
                };
                this.$store.dispatch("register", data).catch(e => console.error(e));
            },


            handleReg(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.register();
                        this.loading = false;
                    } else {
                        console.warn('Register error');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .narrow_input {
        width: 100%
    }
</style>