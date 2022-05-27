<template>
    <h4>基本信息</h4>
    <el-form :model="form" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" :disabled="editable" />
    </el-form-item>
    <el-form-item label="学号">
      <el-input v-model="form.studentNumber" :disabled="editable" />
    </el-form-item>
    <el-form-item label="年级">
      <el-input v-model="form.grade" :disabled="editable" />
    </el-form-item>
    <el-form-item label="学院">
      <el-select v-model="form.school" placeholder="please select your zone" :disabled="editable" >
        <el-option label="计算机科学与技术学院" value="计算机科学与技术学院" />
        <el-option label="软件学院" value="软件学院" />
        <el-option label="数学学院" value="数学学院" />
        <el-option label="物理学院" value="物理学院" />
        <el-option label="生命科学学院" value="生命科学学院" />
        <el-option label="微电子学院" value="微电子学院" />
      </el-select>
    </el-form-item>
    <el-form-item label="专业">
      <el-select v-model="form.major" placeholder="please select your zone" :disabled="editable">
        <el-option label="计算机科学与技术" value="计算机科学与技术" />
        <el-option label="软件工程" value="软件工程" />
        <el-option label="网络安全" value="网络安全" />
      </el-select>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="form.mobile" :disabled="editable" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" :disabled="editable" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" v-if="!editable">Create</el-button>
      <el-button v-if="!editable">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
export default{
    name: 'UserInfo',
    setup() {
        const instance = getCurrentInstance().appContext.config.globalProperties
        // 个人信息
        const form = ref({})
        // 可编辑
        const editable = ref(true)

        onMounted(()=>{
            form.value = {
                ...instance.$store.state.userInfo
            }
        })

        return {
            form,
            editable
        }
    },
}
</script>
