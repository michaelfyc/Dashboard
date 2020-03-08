<template>
    <el-form :model="profile" label-width="120px" label-position="right" ref="profile" :rules="profileRules">
        <el-form-item label="修改用户名" prop="username">
            <el-input v-model="profile.username" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="更改邮箱" prop="email">
            <el-input type="email" v-model="profile.email" class="input_width" required></el-input>
        </el-form-item>
        <el-form-item label="修改密码">
            <el-switch v-model="profile.changePassword"></el-switch>
        </el-form-item>
        <el-row>
            <el-col :span="6">
                <el-form-item label="旧密码" prop="oldPassword" :hide-required-asterisk="!profile.changePassword">
                    <el-input type="password" v-model="profile.oldPassword" class="inline-input_width"
                              :disabled="!profile.changePassword" show-password></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="新密码" prop="newPassword" :hide-required-asterisk="!profile.changePassword">
                    <el-input type="password" v-model="profile.newPassword" class="inline-input_width"
                              :disabled="!profile.changePassword" show-password minlength="6" maxlength="26"
                              show-word-limit></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="确认新密码" prop="vnewPassword" :hide-required-asterisk="!profile.changePassword">
                    <el-input type="password" v-model="profile.vnewPassword" class="inline-input_width"
                              :disabled="!profile.changePassword" show-password></el-input>
                </el-form-item>
            </el-col>

        </el-row>

        <el-form-item>
            <el-button type="primary" @click.prevent="handleUpdate">更新</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

    export default {
        name: "AboutMe",
        data() {
            const validOldPass = (rule, value, callback) => {
                if (!this.profile.changePassword) {
                    callback();
                }
                if (!value) {
                    callback(new Error("请输入旧密码！"));
                } else {
                    callback();
                }
            };

            const validNewPass = (rule, value, callback) => {
                if (!this.profile.changePassword) {
                    callback();
                }
                if (!value) {
                    callback(new Error("请输入新密码！"));
                } else if (value.length < 6 || value.length > 26) {
                    callback(new Error("密码长度应在6-26位之间."));
                } else {
                    callback();
                }
            };

            const validPass = (rule, value, callback) => {
                if (!this.profile.changePassword) {
                    callback();
                }
                if (!value) {
                    callback(new Error("请输入确认密码"));
                } else if (value !== this.profile.newPassword) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };

            return {
                profile: {
                    username: "",
                    email: "",
                    changePassword: false,
                    oldPassword: "",
                    newPassword: "",
                    vnewPassword: "",
                },

                profileRules: {
                    username: [
                        {required: true, message: "请输入用户名！", trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: "请输入邮箱！", trigger: 'blur'}
                    ],
                    oldPassword: [
                        {validator: validOldPass, trigger: 'blur'}
                    ],
                    newPassword: [
                        {validator: validNewPass, trigger: 'blur'},
                    ],
                    vnewPassword: [
                        {validator: validPass, trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            sendNoPwd() {
                let data = {
                    id: this.$store.state.user.id,
                    username: this.profile.username,
                    email: this.profile.email
                };
                this.axios.put("/API/putUserNoPwd", data).then(response => {
                    //如果修改成功:如名字未出现重复
                    if (response.data.statusCode === "200" && response.data.verified === true) {
                        this.$store.commit("updateUser", {
                            username: this.profile.username,
                            password: this.profile.oldPassword,
                            email: this.profile.email
                        });
                        this.$message.success("修改成功！");
                    } else if (response.data.verified === false) {
                        this.$message.error(response.data.message);
                    } else {
                        this.$message.error("服务异常！")
                    }
                })
                    .catch(error => {
                        console.error(error);
                    });
            },

            sendPwd() {
                let data = {
                    id: this.$store.state.user.id,
                    username: this.profile.username,
                    email: this.profile.email,
                    password: this.profile.oldPassword,
                    newPassword: this.profile.vnewPassword
                };
                this.axios.put("/API/putUserPwd", data).then(response => {
                    //如果旧密码正确
                    if (response.data.statusCode === "200" && response.data.verified === true) {
                        this.$store.commit("updateUser", {
                            username: this.profile.username,
                            email: this.profile.email,
                            password: this.profile.vnewPassword
                        });
                        //由于没有刷新页面，提交后要把旧密码换成新的
                        this.profile.oldPassword = this.profile.vnewPassword;
                        this.$message.success("修改成功！");
                    }
                    //如果旧密码错误或者用户名/邮箱重复
                    else if (response.data.verified === false) {
                        this.$message.error(response.data.message);
                    }
                    //其他
                    else {
                        this.$message.error("服务异常！");
                    }
                })
                    .catch(error => {
                        console.error(error);
                    });
            },

            handleUpdate() {
                this.$refs['profile'].validate(valid => {
                    //输入格式正确
                    if (valid) {
                        //先提醒用户
                        this.$confirm("确定修改个人信息？", "提示", {
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                        //如果确认要修改
                            .then(() => {
                                //如果不修改密码
                                if (!this.profile.changePassword) {
                                    this.sendNoPwd();
                                }
                                //如果修改密码
                                else {
                                    this.sendPwd();
                                }
                            })
                            //如果不要修改，则取消
                            .catch(() => {
                                this.$message.info("已取消");
                            });
                    }
                    //输入格式失败
                    else {
                        console.warn("有东西没好好填");
                        return false;
                    }
                });
            }
        },

        created() {
            //解决刷新后state清空的问题
            if (sessionStorage.getItem("user_id")) {
                this.$store.state.user = JSON.parse(sessionStorage.getItem("user_id"));
            }
        },

        mounted() {
            //默认value
            this.profile.username = this.$store.state.user.username;
            this.profile.email = this.$store.state.user.email;
            this.profile.oldPassword = this.$store.state.user.password;
        }
    }
</script>

<style scoped>
    .input_width {
        width: 50%;
    }

    .inline-input_width {
        width: 80%;
    }
</style>