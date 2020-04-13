<template>
    <el-container>
        <!--头像-->
        <el-aside width="300px">
            <el-card style="width:250px;height:300px">
                <div class="user-avatar">
                    <el-image fit="cover" :src="avatar" style="width:100%">
                        <div slot="error">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                        <div slot="placeholder">
                            <img :src="defaultImage" alt="正在加载..">
                        </div>
                    </el-image>
                </div>
                <div class="avatar-button">
                    <el-upload :limit="1" accept="jpg,png,jpeg" action="https://baidu.com"><!--TODO 上传action必须要有-->
                        <el-button type="text" size="medium" @click="handleUpload">修改头像</el-button>
                    </el-upload>
                </div>
            </el-card>
        </el-aside>
        <el-main>
            <!--修改用户信息-->
            <el-form :model="profile" label-width="120px" label-position="right" ref="profile" :rules="profileRules"
                     v-loading="loading">
                <el-form-item label="修改用户名" prop="username">
                    <el-input v-model="profile.username" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="更改邮箱" prop="email">
                    <el-input type="email" v-model="profile.email" class="input_width" required></el-input>
                </el-form-item>
                <el-form-item label="修改密码">
                    <el-switch v-model="profile.changePassword"></el-switch>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPassword" :hide-required-asterisk="!profile.changePassword">
                    <el-input type="password" v-model="profile.oldPassword" class="input_width"
                              :disabled="!profile.changePassword" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" :hide-required-asterisk="!profile.changePassword">
                    <el-input type="password" v-model="profile.newPassword" class="input_width"
                              :disabled="!profile.changePassword" show-password minlength="6" maxlength="26"
                              show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="vnewPassword" :hide-required-asterisk="!profile.changePassword">
                    <el-input type="password" v-model="profile.vnewPassword" class="input_width"
                              :disabled="!profile.changePassword" show-password></el-input>
                </el-form-item>
                <el-row :gutter="6">
                    <!--更新按钮-->
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click.prevent="handleUpdate">更新</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="role===1">
                        <el-row>
                            <el-col :push="19" :span="6">
                                <el-button type="warning" @click="dialogVisible=true">添加新用户</el-button>
                            </el-col>
                        </el-row>
                        <el-dialog title="添加用户" :visible.sync="dialogVisible">
                            <Register/>
                        </el-dialog>
                    </el-col>
                </el-row>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
    import Register from "../Register";

    export default {
        name: "AboutMe",
        components: {Register},
        data() {
            const validName = (rule, value, callback) => {
                if (!value.match(/^[a-zA-Z\u4E00-\u9FA5]{2,16}$/)) {
                    callback(new Error("用户名非法！"));
                } else {
                    callback();
                }
            };

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
                loading: false,
                role: 3,
                dialogVisible: false,
                defaultImage: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
                        {required: true, message: "请输入用户名！", trigger: 'blur'},
                        {validator: validName, trigger: 'blur'}
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
            /**
             * 修改用户信息
             * @param api
             * @param data
             * @returns {Promise<void>}
             */
            async editInfo(api, data) {
                await this.axios.put(api, data)
                    .then(response => {
                        if (response.data.status === "success") {
                            this.$message.success("修改信息成功！");
                            window.location.reload();
                        } else {
                            this.$message.error(response.data.reason);
                        }
                    })
                    .catch(e => {
                        console.error(e);
                        this.$message.error("系统错误！")
                    })
            },

            /**
             * 修改用户信息
             */
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
                                this.loading = true;
                                this.editInfo("/api/editUserInfo", this.profile);
                                this.loading = false;
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
            },

            handleUpload() {//TODO 上传图片

            }
        },

        async mounted() {
            //TODO 每次加载头像
            await this.axios.get("/api/getUserInfo")
                .then(response => {
                    console.log("获取用户信息成功");
                    this.profile.username = response.data.username;
                    this.profile.email = response.data.email;
                    this.role = response.data.role;
                })
                .catch(e => {
                    console.error(e);
                    this.$message.error("获取用户信息失败！");
                })
        }
    }
</script>

<style scoped>
    .input_width {
        width: 50%;
    }

    .user-avatar {
        padding: 0 auto;
    }

    .avatar-button {
        margin: 10px auto;
        text-align: center;
    }
</style>