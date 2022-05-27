/* eslint-disable vue/no-unused-vars */
<template>
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="自习室">
      <el-select v-model="form.room" placeholder="请选择自习室编号">
        <el-option label="请选择" value="0" />
        <el-option label="01室" value="1" />
        <el-option label="02室" value="2" />
        <el-option label="03室" value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="区域">
      <el-select v-model="form.region" placeholder="请选择区域编号">
        <el-option label="请选择" value="0" />
        <el-option label="1" value="1" />
        <el-option label="2" value="2" />
        <el-option label="3" value="3" />
        <el-option label="4" value="4" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="sitList">
      <el-table-column label="自习室" prop="room"></el-table-column>
      <el-table-column label="分区" prop="region"></el-table-column>
      <el-table-column label="座位号" prop="sitNumber"></el-table-column>
      <el-table-column label="是否空闲">
          <template #default="scope">
              <el-tag class="ml-2" :type="scope.row.available?'success':'danger'">{{scope.row.available?'是':'否'}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="最近空闲时间" prop="availableDate"></el-table-column>
      <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">预定</el-button>
          </template>
      </el-table-column>
  </el-table>

  <el-pagination background layout="prev, pager, next" :total="totalPage" :current-page="current" />

</template>

<script>
import { reactive, ref, toRaw } from '@vue/reactivity'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'

export default{
    name: 'SitSearch',
    setup() {
        const instance = getCurrentInstance()
        // 表单查询数据
        const form = reactive({})
        // 座位列表
        const sitList = ref([])
        // 分页信息
        const pages = ref({})
        // 获取座位信息
        const getSitList = ()=>{
            instance.appContext.config.globalProperties.$http.post('/sit/search').then((res)=>{
                sitList.value = res.sits
                pages.value = {
                    total: res.total,
                    currentPage: res.currentPage,
                    pageSize: res.pageSize
                }
            })
        }
        // 查询座位
        const onSubmit = ()=>{
            console.log(toRaw(form) );
            instance.appContext.config.globalProperties.$http.post('sit/search', toRaw(form)).then((res)=>{
                sitList.value = res.sits
                pages.value = {
                    total: res.total,
                    currentPage: res.currentPage,
                    pageSize: res.pageSize
                }
            })
        }

        onMounted(()=>{
            getSitList()
        })

        return{
            form,
            sitList,
            pages,
            getSitList,
            onSubmit
        }
    },
}
</script>
