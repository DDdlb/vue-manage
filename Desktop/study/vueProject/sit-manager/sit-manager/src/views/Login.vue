<template>
  <el-form ref="loginForm" :model="userInfo" label-width="60px" :rules="rules" class="loginForm">
      <h1>欢迎来到座位管理系统</h1>
      <el-form-item label="学号"  prop="studentNumber">
          <el-input v-model="userInfo.studentNumber" placeholder="请输入学号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userInfo.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    setup() {
        // 获取全局对象
        const instance = getCurrentInstance()
        // 用户登录信息
        const userInfo = reactive({
            studentNumber: '',
            password: ''
        })
        // 表单校验
        const rules = reactive({
            studentNumber: [{required: true, message: '请输入学号登录', trigger: 'blur'}],
            password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        })
        // 登录
        const handleLogin = ()=>{
            // console.log(instance);
            instance.ctx.$refs.loginForm.validate((val)=>{
                if(val){
                    instance.appContext.config.globalProperties.$http.post('/user/login',userInfo).then((res)=>{
                        console.log(instance)
                        instance.appContext.config.globalProperties.$store.commit('saveUserInfo', res)
                        instance.appContext.config.globalProperties.$router.push('/')
                    })
                }
            })
        }
        return {
            userInfo,
            rules,
            handleLogin
        }
    },
}
</script>

<style lang="scss" scoped>
.loginForm{
    width: 30%;
    margin: auto;
    padding: 40px;
    border: 1px solid rgb(195, 195, 195);
    border-radius: 2px;
    box-shadow: 0 0 4px rgb(236, 236, 236);

    h1{
        color: rgb(90, 90, 90);
    }
}
</style>
