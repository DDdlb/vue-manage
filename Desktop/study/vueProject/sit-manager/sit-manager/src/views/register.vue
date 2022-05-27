<template>
  <el-form ref="loginForm" :model="userInfo" label-width="100px" :rules="rules" class="loginForm">
      <h1 style="text-align: center">欢迎来到座位管理系统</h1>
      <el-form-item label="学号"  prop="studentNumber">
          <el-input v-model="userInfo.studentNumber" placeholder="请输入学号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userInfo.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
          <el-input type="password" v-model="userInfo.rePsd" placeholder="请再次输入密码" />
      </el-form-item>
      <el-form-item label="学院"  prop="school" required>
        <el-select v-model="userInfo.school" placeholder="请选择学院"  >
            <el-option label="计算机科学与技术学院" value="计算机科学与技术学院" />
            <el-option label="软件学院" value="软件学院" />
            <el-option label="数学学院" value="数学学院" />
            <el-option label="物理学院" value="物理学院" />
            <el-option label="生命科学学院" value="生命科学学院" />
            <el-option label="微电子学院" value="微电子学院" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业" prop="major" required>
        <el-select v-model="userInfo.major" placeholder="请选择专业">
            <el-option label="计算机科学与技术" value="计算机科学与技术" />
            <el-option label="软件工程" value="软件工程" />
            <el-option label="网络安全" value="网络安全" />
        </el-select>
    </el-form-item>
    <el-form-item label="联系电话"  prop="studentNumber">
          <el-input v-model="userInfo.mobile" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="邮箱"  prop="studentNumber">
          <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="handleLogin">注册</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Register',
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
            studentNumber: [{required: true, message: '请输入学号', trigger: 'blur'}],
            password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        })
        // 登录
        const handleLogin = ()=>{
            // console.log(instance);
            instance.ctx.$refs.loginForm.validate((val)=>{
                if(val){
                    instance.appContext.config.globalProperties.$http.post('/user/register',userInfo).then(()=>{
                        console.log(instance)
                        // instance.appContext.config.globalProperties.$store.commit('saveUserInfo', res)
                        instance.appContext.config.globalProperties.$router.push('/login')
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
    width: 50%;
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
