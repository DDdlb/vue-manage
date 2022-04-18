<template>
    <el-form ref="userForm" :model="user" label-width="100px" :rules="rules" status-icon class="login-form">
        <h1 class="title">登录</h1>
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="user.userName" prefix-icon="el-icon-ser"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psd">
            <el-input type="password" v-model="user.psd" prefix-icon="el-icon-view"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</template> 

<script>

export default {
    name: 'login',
    data(){
        return {
            rules:{
                userName: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: "blur"
                }],
                    psd: [{
                        required: true,
                        message: '密码',
                        trigger: "blur"
                }] 
            },
            user: {
                userName: '',
                psd: ''
            }
        }
        
    },
    methods: {
        login(){
            this.$refs.userForm.validate((valid)=>{
                if(valid){
                    this.$request.post('/users/login', {userName: this.user.userName, userPwd: this.user.psd}, {mock: false}).then((res)=>{
                        this.$store.commit('saveUserInfo', res);
                        this.$router.push('/');
                    })
                }else{
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss">
.login-form{
    width: 40%;
    margin: auto;
    margin-top: 150px;
    padding: 40px;
    padding-top: 60px;
    // border: 1px solid rgb(119, 119, 119);
    border-radius: 2px;
    box-shadow: 0px 0px 3px 3px rgb(219, 219, 219);
    color: #000;
    .title{
        text-align: center;
        margin-bottom: 20px;
        font-size: larger;
        font-weight: bolder;
    }
}
</style>