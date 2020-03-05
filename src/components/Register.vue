<template>
    <el-form label-width="80px" v-model="regForm" ref="regForm" :rules="regRules">
        <el-form-item label="用户名" prop="username">
            <el-input style="width:50%" v-model="regForm.username" class="narrow_input"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="regForm.email" class="narrow_input"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="regForm.password" class="narrow_input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="vpassword">
            <el-input type="password" v-model="regForm.vpassword" class="narrow_input"></el-input>
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
            return {
                regForm: {
                    username: '',
                    email: '',
                    password: '',
                    vpassword: ''
                },
                regRules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: 'blur'},
                        {validator: this.validName, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: "请输入邮箱", trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: 'blur'},
                        {validator: this.validPwd, trigger: 'blur'}
                    ],
                    vpassword: [
                        {required: true, message: "请输入验证密码", trigger: 'blur'},
                        {validator: this.validvPwd, trigger: 'blur'}
                    ]
                },

                //TODO
                /*validName: (rule, value, callback) => {
                    //do validation
                },
                validPwd: (rule, value, callback) => {
                    //do validation
                },
                validvPwd: (rule, value, callback) => {
                    //oo validation
                }*/
            }
        },

        methods: {
            handleReg(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //register
                    } else {
                        console.log('error');
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