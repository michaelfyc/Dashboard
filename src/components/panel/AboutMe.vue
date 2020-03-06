<template>
    <el-form v-model="profile" label-width="80px" label-position="left" ref="profile">
        <el-form-item label="用户名">
            <el-input v-model="profile.username" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="更改邮箱">
            <el-input type="email" v-model="profile.email" class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="修改密码">
            <el-input type="password" v-model="profile.oldPassword" class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input type="password" v-model="profile.newPassword" class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
            <el-input type="password" v-model="profile.vnewPassword" class="input_width"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleUpdate">更新</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "AboutMe",
        computed: {
            username() {
                return this.$store.state.username
            },
            password() {
                return this.$store.state.password
            },
            email() {
                return this.$store.state.email
            }
        },
        data() {
            return {
                profile: {
                    username: '',
                    email: '',
                    oldPassword: '',
                    newPassword: '',
                    vnewPassword: '',
                }
            }
        },

        methods: {
            handleUpdate() {
                //1.Validate
                //2.Change store state
                this.$store.commit("update", {
                    username: this.profile.username,
                    email: this.profile.email,
                    password: this.profile.vnewPassword
                })
            }
        }
    }
</script>

<style scoped>
    .input_width {
        width: 80%;
    }
</style>